import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import styled from "styled-components";
import {
  Button,
  Container,
  Heading,
  icons,
  Section,
  theme,
  Title
} from "@socialgouv/react-ui";

import ServiceRenseignementModal from "../common/ServiceRenseignementModal";

const { DirectionRight: DirectionRightIcon } = icons;
const { publicRuntimeConfig } = getConfig();

const GITHUB_REPO = "https://github.com/SocialGouv/code-du-travail-numerique";

const Footer = () => (
  <StyledFooter>
    <ServiceSection>
      <Container>
        <Title>Besoin d’un accompagnement personnalisé ?</Title>
        <SecondContainerWrapper narrow noPadding>
          Les services de renseignement en droit du travail peuvent vous donner
          des informations juridiques générales relatives au Code du travail,
          aux conventions collectives, à la jurisprudence. Ils peuvent également
          vous conseiller et vous orienter dans vos démarches.
        </SecondContainerWrapper>
        <ServiceRenseignementModal>
          <Button>
            Contacter nos services
            <StyledDirectionRightIcon />
          </Button>
        </ServiceRenseignementModal>
      </Container>
    </ServiceSection>
    <NavSection>
      <nav>
        <Links>
          <Category>
            <StyledHeading>Code du travail numérique</StyledHeading>
            <StyledList>
              <StyledListItem>
                <Link passHref href="/droit-du-travail">
                  <StyledLink>Le droit du travail</StyledLink>
                </Link>
              </StyledListItem>
              <StyledListItem>
                <Link passHref href="/glossaire">
                  <StyledLink>Glossaire</StyledLink>
                </Link>
              </StyledListItem>
              <StyledListItem>
                <Link passHref href="/a-propos">
                  <StyledLink>À propos</StyledLink>
                </Link>
              </StyledListItem>
              <StyledListItem>
                <Link passHref href="/mentions-legales">
                  <StyledLink>Mentions légales</StyledLink>
                </Link>
              </StyledListItem>
              <StyledListItem>
                <StyledLink href="mailto:codedutravailnumerique@travail.gouv.fr">
                  Contact
                </StyledLink>
              </StyledListItem>
            </StyledList>
          </Category>
          <Category>
            <StyledHeading>Aidez-nous à améliorer cet outil</StyledHeading>
            <StyledList>
              <StyledListItem>
                <StyledLink
                  href={`${GITHUB_REPO}/tree/${publicRuntimeConfig.PACKAGE_VERSION}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribuer sur Github
                </StyledLink>
              </StyledListItem>
              <StyledListItem>
                {(() => {
                  const packageVersion =
                    publicRuntimeConfig.PACKAGE_VERSION || "";
                  const isTag = packageVersion[0] === "v";
                  const path = isTag
                    ? "releases/tag"
                    : packageVersion === "master"
                    ? "commits"
                    : "compare";
                  return (
                    <StyledLink
                      href={`${GITHUB_REPO}/${path}/${packageVersion}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Journal des modifications
                    </StyledLink>
                  );
                })()}
              </StyledListItem>
            </StyledList>
          </Category>
          <Category>
            <StyledHeading>En collaboration avec</StyledHeading>
            <StyledList>
              <StyledListItem>
                <StyledLink
                  href={
                    "https://travail-emploi.gouv.fr/ministere/organisation/article/dgt-direction-generale-du-travail"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  La Direction Générale du Travail
                </StyledLink>
              </StyledListItem>
              <StyledListItem>
                <StyledLink
                  href={"https://incubateur.social.gouv.fr/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  L’incubateur des ministères sociaux
                </StyledLink>
              </StyledListItem>
              <StyledListItem>
                <StyledLink
                  href={"https://beta.gouv.fr/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  beta.gouv.fr
                </StyledLink>
              </StyledListItem>
            </StyledList>
          </Category>
        </Links>
      </nav>
    </NavSection>
  </StyledFooter>
);

export default Footer;

const { breakpoints, fonts, spacings } = theme;

const StyledFooter = styled.footer`
  position: relative;
  z-index: 1;
  margin-top: ${spacings.larger};
  padding-top: ${spacings.larger};
  background-color: ${({ theme }) => theme.bgSecondary};
  &:before {
    position: absolute;
    top: -27px;
    left: -50%;
    z-index: -1;
    width: 200%;
    height: 400px;
    background-color: ${({ theme }) => theme.bgSecondary};
    border-radius: 100%;
    content: "";
  }
  @media print {
    display: none;
  }
`;

const ServiceSection = styled(Section)`
  position: relative;
  padding-bottom: ${spacings.larger};
  text-align: center;
  &:before {
    position: absolute;
    top: 0;
    left: 50%;
    width: 70px;
    height: 3px;
    background-color: ${({ theme }) => theme.secondary};
    transform: translateX(-50%);
    content: "";
  }
`;

const SecondContainerWrapper = styled(Container)`
  margin-bottom: ${spacings.medium};
  text-align: left;
`;

const StyledDirectionRightIcon = styled(DirectionRightIcon)`
  width: 1.5em;
  margin-left: ${spacings.base};
`;

const NavSection = styled(Section)`
  padding: ${spacings.larger} 0;
  background-color: ${({ theme }) => theme.bgTertiary};
`;

const Links = styled(Container)`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Category = styled.div`
  & + & {
    padding-left: ${spacings.base};
    @media (max-width: ${breakpoints.mobile}) {
      padding-left: 0;
    }
  }
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  @media (max-width: ${breakpoints.mobile}) {
    text-align: center;
  }
`;

const StyledHeading = styled(Heading)`
  font-size: ${fonts.sizes.default};
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.small};
    text-align: center;
  }
`;

const StyledListItem = styled.li`
  margin: ${spacings.tiny} 0;
  padding: 0;
`;
const StyledLink = styled.a`
  font-weight: normal;
  text-decoration: none;
`;
