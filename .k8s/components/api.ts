import env from "@kosko/env";
import { ok } from "assert";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX;

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/api/v1/version",
  port: "http",
};

export default async () => {
  const manifests = await create("api", {
    env,
    config: {
      subDomainPrefix: env.env === "prod" ? "api." : "api-",
      image: getHarborImagePath({ name: "cdtn-api" }),
      containerPort: 1337,
      container: {
        livenessProbe: {
          httpGet,
          initialDelaySeconds: 15,
          timeoutSeconds: 15,
        },
        readinessProbe: {
          httpGet,
          initialDelaySeconds: 5,
          timeoutSeconds: 3,
        },
        startupProbe: {
          httpGet,
          initialDelaySeconds: 0,
          timeoutSeconds: 15,
        },
        resources: {
          requests: {
            cpu: "100m",
            memory: "320Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1Gi",
          },
        },
        env: [
          {
            name: "ELASTIC_APM_ENVIRONMENT",
            value: `cdtn-${process.env.CI_ENVIRONMENT_SLUG}`,
          },
          {
            name: "ES_INDEX_PREFIX",
            value: ES_INDEX_PREFIX,
          },
          {
            name: "VERSION",
            value: process.env.CI_COMMIT_REF_NAME,
          },
        ],
      },
    },
  });

  // make some adjustments on generated manifests
  const deployment = manifests.find(
    (manifest): manifest is Deployment => manifest.kind === "Deployment"
  );
  ok(deployment);
  ok(deployment.spec);

  const hpa = new HorizontalPodAutoscaler({
    metadata: deployment.metadata,
    spec: {
      minReplicas: 1,
      maxReplicas: 10,

      metrics: [
        {
          resource: {
            name: "cpu",
            target: {
              averageUtilization: 80,
              type: "Utilization",
            },
          },
          type: "Resource",
        },
        {
          resource: {
            name: "memory",
            target: {
              averageUtilization: 80,
              type: "Utilization",
            },
          },
          type: "Resource",
        },
      ],

      scaleTargetRef: {
        apiVersion: deployment.apiVersion,
        kind: deployment.kind,
        name: deployment.metadata!.name!,
      },
    },
  });

  //

  if (env.env === "prod") {
    manifests.push(hpa);
  }

  return manifests;
};
