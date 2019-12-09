import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getLabelBySource, getRouteBySource, SOURCES } from "@cdt/sources";
import {
  Alert,
  Container,
  Heading,
  icons,
  theme,
  Wrapper
} from "@socialgouv/react-ui";

import useGlossary from "../glossary";
import Article from "./Article";
import { Feedback } from "./Feedback";
import Html from "./Html";
import { ThemeBreadcrumbs } from "./ThemeBreadcrumbs";
import { CustomTile } from "./tiles/Custom";

const { DirectionRight } = icons;

const BigError = ({ children }) => (
  <StyledErrorContainer>
    <Alert>{children}</Alert>
  </StyledErrorContainer>
);

function Answer({
  title,
  intro = null,
  html = null,
  children = null,
  date,
  source,
  additionalContent,
  breadcrumbs = [],
  relatedItems = [],
  emptyMessage = "Aucun résultat"
}) {
  const glossaryItems = useGlossary(children, html);
  const router = useRouter();
  const { relatedTools, relatedLetters, relatedArticles } = relatedItems.reduce(
    (accumulator, item) => {
      const itemSource = item.source;
      if (itemSource === SOURCES.TOOLS) {
        accumulator.relatedTools.push(item);
      } else if (itemSource === SOURCES.LETTERS) {
        accumulator.relatedLetters.push(item);
      } else {
        accumulator.relatedArticles.push(item);
      }
      return accumulator;
    },
    {
      relatedTools: [],
      relatedLetters: [],
      relatedArticles: []
    }
  );

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeBreadcrumbs breadcrumbs={breadcrumbs} />
      <StyledContainer>
        <StyledContent hasResults={relatedItems.length > 0}>
          {!html && !children && <BigError>{emptyMessage}</BigError>}
          {(html || children) && (
            <Article
              subtitle={
                breadcrumbs.length > 0 &&
                breadcrumbs[breadcrumbs.length - 1].title
              }
              title={title}
              date={date}
              source={source}
            >
              {intro && <IntroWrapper variant="dark">{intro}</IntroWrapper>}
              {html && <Html>{html}</Html>}
              {children}
              {glossaryItems}
            </Article>
          )}
          {additionalContent}
          <Feedback
            query={router.query.q}
            sourceType={source && source.name}
            sourceFilter={router.query.source}
            url={router.asPath}
            title={title}
          />
        </StyledContent>
        {relatedItems.length > 0 && (
          <RelatedItems>
            <StyledList>
              {relatedLetters.length > 0 && (
                <StyledListItem>
                  <Link
                    href={`/${getRouteBySource(
                      relatedLetters[0].source
                    )}/[slug]`}
                    as={`/${getRouteBySource(relatedLetters[0].source)}/${
                      relatedLetters[0].slug
                    }`}
                    passHref
                  >
                    <CustomTile
                      action="Consulter"
                      icon={icons.Document}
                      title={relatedLetters[0].title}
                      subtitle={getLabelBySource(relatedLetters[0].source)}
                    />
                  </Link>
                </StyledListItem>
              )}
              {relatedTools.length > 0 && (
                <StyledListItem>
                  <Link
                    href={`/${getRouteBySource(relatedTools[0].source)}/[slug]`}
                    as={`/${getRouteBySource(relatedTools[0].source)}/${
                      relatedTools[0].slug
                    }`}
                    passHref
                  >
                    <CustomTile
                      action={relatedTools[0].action}
                      icon={icons[relatedTools[0].icon]}
                      title={relatedTools[0].title}
                      subtitle={getLabelBySource(relatedTools[0].source)}
                    >
                      {relatedTools[0].description}
                    </CustomTile>
                  </Link>
                </StyledListItem>
              )}
              {relatedArticles.length > 0 && (
                <StyledListItem>
                  <Heading>Les articles pouvant vous intéresser&nbsp;:</Heading>
                </StyledListItem>
              )}
              {relatedArticles.slice(0, 3).map(link => (
                <StyledListItem key={link.slug}>
                  <Link
                    href={`/${getRouteBySource(link.source)}/[slug]`}
                    as={`/${getRouteBySource(link.source)}/${link.slug}`}
                    passHref
                  >
                    <StyledLink>
                      <StyledDirectionRight />
                      {link.title}
                    </StyledLink>
                  </Link>
                </StyledListItem>
              ))}
            </StyledList>
          </RelatedItems>
        )}
      </StyledContainer>
    </>
  );
}

export default Answer;

const { breakpoints, fonts, spacings } = theme;

const StyledErrorContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizes.headings.large};
  text-align: center;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  padding: 0;
`;

const StyledContent = styled.div`
  width: ${props => (props.hasResults ? "70%" : "80%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const RelatedItems = styled.div`
  position: sticky;
  top: 10rem;
  width: 30%;
  padding: ${spacings.medium} ${spacings.base} ${spacings.medium} 0;
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StyledList = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const StyledListItem = styled.li`
  margin: ${spacings.base} 0;
  padding: 0;
`;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;
`;

const StyledLink = styled.a`
  display: flex;
  align-items: flex-start;
  text-decoration: none;
`;

const StyledDirectionRight = styled(DirectionRight)`
  flex: 0 0 2.5rem;
  margin: ${spacings.xsmall} ${spacings.base} 0 0;
  color: ${({ theme }) => theme.primary};
`;
