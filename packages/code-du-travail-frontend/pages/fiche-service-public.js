import React from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import getConfig from "next/config";
import FicheServicePublic from "@socialgouv/react-fiche-service-public";
import Answer from "../src/common/Answer";
import ReponseIcon from "../src/icons/ReponseIcon";
import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";

const ServicePublicCss = styled.div`
  .sp__Titre {
    font-size: 1.5rem;
  }
`;

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchFiche = ({ slug }) =>
  fetch(`${API_URL}/items/fiches_service_public/${slug}`).then(r => r.json());

const Source = ({ name, url }) => (
  <a
    href={url}
    className="external-link__after"
    target="_blank"
    rel="noopener noreferrer"
  >
    Voir le contenu original sur : {name}{" "}
  </a>
);

class Fiche extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchFiche(query);
    if (data.status === 404) {
      return { data: { _source: {} } };
    }
    if (data._source.raw) {
      data._source.raw = JSON.parse(data._source.raw);
    }
    return { data };
  }

  render() {
    const { data, pageUrl } = this.props;
    const footer = <Source name="service-public.fr" url={data._source.url} />;
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={data._source.title}
          description={data._source.description}
        />
        <ServicePublicCss>
          <Answer
            title={data._source.title}
            emptyMessage="Cette fiche n'a pas été trouvée"
            html={data._source.html}
            footer={footer}
            date={data._source.date}
            icon={ReponseIcon}
            sourceType="Fiche service-public.fr"
            referencesJuridiques={data._source.references_juridiques}
            breadcrumbs={data._source.breadcrumbs}
          >
            {// Without the check, the prop children of the Answer will evaluate to true
            // even if in the end, <FicheServicePublic /> returns null
            data._source.raw && (
              <FicheServicePublic data={data._source.raw.$} />
            )}
          </Answer>
        </ServicePublicCss>
      </PageLayout>
    );
  }
}

export default withRouter(Fiche);
