import React from "react";
import PropTypes from "prop-types";
import getConfig from "next/config";
import Sidebar from "./texte/Sidebar";
import Content from "./texte/Content";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

const {
  publicRuntimeConfig: { API_DILA2SQL_URL }
} = getConfig();

class ConventionTexte extends React.Component {
  constructor(props) {
    super(props);
    if (props.preloadedTexte) {
      const texte = props.preloadedTexte;
      const topNode = this.getFirstNodeWithChildren(texte);
      this.state = { topNode, texte, loaded: true };
    } else {
      this.state = { loaded: false };
    }
  }

  async componentDidMount() {
    if (this.state.texte) {
      return false;
    }
    const { id } = this.props;
    const texte = await this.fetchTexte({ id });
    const topNode = this.getFirstNodeWithChildren(texte);
    this.setState({ texte, topNode, loaded: true });
  }

  getFirstNodeWithChildren(texte) {
    let topNode = texte;
    while (topNode.children && topNode.children.length == 1) {
      topNode = topNode.children[0];
    }
    return topNode.children ? topNode : texte;
  }

  fetchTexte({ id }) {
    const url = `${API_DILA2SQL_URL}/base/KALI/texte/${id}`;
    return fetch(url).then(r => r.json());
  }

  onChangeSummaryTitleExpanded(expanded, sectionId) {
    const { topNode } = this.state;
    const sectionIdx = topNode.children.findIndex(
      child => child.data.id == sectionId
    );
    const newSection = { ...topNode.children[sectionIdx], expanded };
    const newChildren = [...topNode.children];
    newChildren[sectionIdx] = newSection;
    const newRootNode = { ...topNode, children: newChildren };
    this.setState({ topNode: newRootNode });
  }

  render() {
    const { loaded, texte, topNode } = this.state;
    return (
      <Wrapper>
        {!loaded && "chargement ..."}
        {loaded && (
          <SidebarWrapper>
            <Sidebar
              topNode={topNode}
              onSummaryTitleToggleExpanded={(sectionId, visible) =>
                this.onChangeSummaryTitleExpanded(visible, sectionId)
              }
            />
          </SidebarWrapper>
        )}
        {loaded && (
          <ContentWrapper>
            <Content topNode={topNode} texte={texte} />
          </ContentWrapper>
        )}
      </Wrapper>
    );
  }
}

ConventionTexte.propTypes = {
  id: PropTypes.string.isRequired,
  preloadedTexte: PropTypes.shape({
    children: PropTypes.array
  })
};

const Wrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const SidebarWrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    flex: 0 1 40%;
    position: sticky;
    top: 0px;
    max-height: 100vh;
    overflow: scroll;
    padding-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    flex: 0 1 60%;
    overflow: scroll;
    padding-left: 10px;
  }
`;

export default ConventionTexte;
