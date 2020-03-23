import React from "react";
import { PageTitle } from "../Titles/PageTitle";
import { Container } from "./Container";
import { Section } from "./Section";
import { Wrapper } from "./Wrapper";

export default {
  title: "Layout|Readme",
};

export const readme = () => (
  <>
    <PageTitle>How it works</PageTitle>
    <p>
      {
        "The following order is usually respected : Section > Container > Wrapper"
      }
    </p>
    <p>More details are provided in each specific component documentation</p>
    <p>
      N.B. Although Wrapper is supposed to provide normalized spacings, you can
      always add paddings and marging anywhere needed. But you must use the
      spacings variables in the `theme.js` file.
    </p>
    <Section>
      <Container>
        <Wrapper variant="dark">
          {" "}
          This is a dark wrapper inside a neutral section
        </Wrapper>
      </Container>
    </Section>
    <Section variant="white">
      <Container>
        <Wrapper variant="light">
          {" "}
          This is a light wrapper inside a white section
        </Wrapper>
      </Container>
    </Section>
    <Section variant="light">
      <Container>
        <Wrapper variant="dark">
          {" "}
          This is a dark wrapper inside a light section
        </Wrapper>
      </Container>
    </Section>
    <Section variant="dark">
      <Container>
        <Wrapper variant="light" size="large">
          {" "}
          This is a large light wrapper inside a dark section
        </Wrapper>
      </Container>
    </Section>
  </>
);
