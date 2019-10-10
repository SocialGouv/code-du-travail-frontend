import React from "react";
import styled from "styled-components";
import { List, ListItem } from "@cdt/ui-old";
import { theme } from "@socialgouv/react-ui";
import Link from "next/link";
import TYPE_REFERENCE from "../typeReference";
import ArticleIcon from "../../icons/ArticleIcon";

const { box, colors, spacing } = theme;

const CodeDuTravailLink = ({ title, slug }) => (
  <Link href="/code-du-travail/[slug]" as={`/code-du-travail/${slug}`} passHref>
    <ReferenceLink>
      <Icon width={18} />
      {title}
    </ReferenceLink>
  </Link>
);

const ConventionLink = ({ title, slug }) => (
  <Link
    href="/convention-collective/[slug]"
    as={`/convention-collective/${slug}`}
    passHref
  >
    <ReferenceLink>
      <Icon width={18} />
      Convention collective: {title}
    </ReferenceLink>
  </Link>
);

const OtherLink = ({ title, url }) => (
  <ReferenceLink href={url} rel="noopener noreferrer" target="_blank">
    <Icon width="18" />
    Autre: {title}
  </ReferenceLink>
);

const getLink = reference => {
  switch (reference.type) {
    case TYPE_REFERENCE.codeDuTravail:
      return <CodeDuTravailLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.conventionCollective:
      return <ConventionLink title={reference.title} slug={reference.id} />;
    case TYPE_REFERENCE.journalOfficiel:
      return <OtherLink title={reference.title} url={reference.url} />;
  }
};

const ReferenceList = ({ references }) => {
  return (
    <List>
      {references.map(reference => (
        <ListItem key={reference.id}>{getLink(reference)}</ListItem>
      ))}
    </List>
  );
};

export default ReferenceList;

const ReferenceLink = styled.a`
  display: block;
  margin-top: ${spacing.base};
  padding: ${spacing.base};
  background-color: ${colors.lightBackground};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  cursor: pointer;
`;

const Icon = styled(ArticleIcon)`
  position: relative;
  top: 1px;
  vertical-align: middle;
  margin-right: ${spacing.base};
`;
