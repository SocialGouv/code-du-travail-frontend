import { Queries } from "@socialgouv/cdtn-monolog";
import { Client } from "@elastic/elasticsearch";
import { logger } from "./logger";
import { getRouteBySource, SOURCES } from "@cdt/sources";

const ES_LOGS = process.env.ES_LOGS;
const ES_LOGS_TOKEN = process.env.ES_LOGS_TOKEN;

if (!ES_LOGS || !ES_LOGS_TOKEN) {
  console.error(
    `Missing env variable for accessing Monolog Elastic Search logs : ${
      ES_LOGS ? "" : "ES_LOGS"
    } ${ES_LOGS_TOKEN ? "" : "ES_LOGS_TOKEN"}`
  );
  logger.error(
    `Missing env variable for accessing Monolog Elastic Search logs : ${
      ES_LOGS ? "" : "ES_LOGS"
    } ${ES_LOGS_TOKEN ? "" : "ES_LOGS_TOKEN"}`
  );
}

const esClientConfig = {
  node: ES_LOGS,
  auth: { apiKey: ES_LOGS_TOKEN },
};

const client = new Client(esClientConfig);

const queries = Queries(client, "log_reports");

export const fetchCovisits = async (doc) => {
  let sourceRoute = getRouteBySource(doc.source);

  // special case for fiches MT
  if (doc.source == SOURCES.SHEET_MT_PAGE) {
    sourceRoute = getRouteBySource(SOURCES.SHEET_MT);
  }

  const path = `${sourceRoute}/${doc.slug}`;
  const links = await queries
    .getCovisitLinks(path)
    .then((covisits) => covisits.links)
    .catch(() => {
      // TODO avoid silent and deal with failure properly
      // console.error(err);
      return undefined;
    });

  /*
  if (doc.source == SOURCES.SHEET_MT_PAGE) {
    console.error(links);
    console.error(path);
    console.error(doc.url);
  }
  */

  doc.covisits = links;

  return doc;
};