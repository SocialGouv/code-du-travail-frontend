import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import { Container, Alert } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import Search from "../src/search/Search";
import CalculateurIndemnite from "../src/outils/indemniteLicenciement";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const Source = ({ name }) => (
  <div
    style={{
      background: "var(--color-light-background)",
      padding: 10,
      marginTop: 50,
      textAlign: "center"
    }}
  >
    {name}
  </div>
);

const getOutilsFromCode = function(code) {
  switch (code) {
    case "indemnite-licenciement":
      return {
        title: "calculer une indemnité de licenciement",
        outils: CalculateurIndemnite
      };

    default:
      return {
        title: "Outils introuvable",
        outils: () => <BigError> Cet outils est introuvable </BigError>
      };
  }
};

class Outils extends React.Component {
  static async getInitialProps({ query }) {
    // we don't request data from api since outils are client side only
    return { data: { _source: { slug: query.slug } } };
  }
  render() {
    const { data, router } = this.props;
    const { outils: Outil, title } = getOutilsFromCode(data._source.slug);
    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <Search />
        <Outil q={router.query.q} />
        <Source name="-" />
        <SeeAlso />
      </React.Fragment>
    );
  }
}

export default withRouter(Outils);
