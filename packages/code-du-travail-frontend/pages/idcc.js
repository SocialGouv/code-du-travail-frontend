import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Button } from "@cdt/ui";
import { Download } from "react-feather";
import Answer from "../src/common/Answer";
import ArticleIcon from "../src/icons/ArticleIcon";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// a FAQ answer

const fetchIdcc = ({ slug }) =>
  fetch(`${API_URL}/items/idcc/${slug}`).then(r => r.json());

class Idcc extends React.Component {
  static async getInitialProps({ query }) {
    const data = await fetchIdcc(query);
    return { data };
  }
  render() {
    const { data } = this.props;
    if (data.status === 404) {
      return (
        <Answer emptyMessage="Cette convention collective n'a pas été trouvée" />
      );
    }
    return (
      <Answer
        title={data._source.title}
        emptyMessage="Cette convention collective n'a pas été trouvée"
        footer="Informations fournies par la DILA"
        sourceType="Convention collective"
        icon={ArticleIcon}
      >
        <p>
          Cliquez sur le lien ci dessous pour accéder à la convention collective
          sur LegiFrance :
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.legifrance.gouv.fr/rechConvColl.do?&champIDCC=${
            data._source.id
          }`}
        >
          <Button primary>
            <Download style={{ verticalAlign: "middle", marginRight: 10 }} />
            {data._source.title}
          </Button>{" "}
        </a>
      </Answer>
    );
  }
}

export default withRouter(Idcc);
