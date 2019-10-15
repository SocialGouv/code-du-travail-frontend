import React from "react";
import Link from "next/link";
import { getRouteBySource } from "@cdt/sources";
import { LargeLink, List, ListItem } from "@cdt/ui-old";
import { Container, Section, Wrapper } from "@socialgouv/react-ui";

import { ResultContent } from "./ResultContent";

export const Themes = ({ items, query }) => (
  <Section>
    <Container narrow>
      <Wrapper variant="light">
        <h2>{"Themes suceptibles de vous intéresser"}</h2>
        <List>
          {items.map(item => (
            <ListItem key={item.slug}>
              <Link
                href={{
                  pathname: `/${getRouteBySource(item.source)}/[slug]`,
                  query: {
                    ...(query && { q: query }),
                    slug: item.slug
                  }
                }}
                as={`/${getRouteBySource(item.source)}/${item.slug}${
                  query ? `?q=${query}` : ""
                }`}
                passHref
              >
                <LargeLink as="span">
                  <ResultContent {...item} />
                </LargeLink>
              </Link>
            </ListItem>
          ))}
        </List>
      </Wrapper>
    </Container>
  </Section>
);
