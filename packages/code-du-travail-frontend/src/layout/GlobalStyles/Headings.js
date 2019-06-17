import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { colors, fonts, spacing } = theme;

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.title};
    line-height: ${fonts.lineHeight};
    font-weight: 700;
    margin: ${spacing.xsmall} 0 ${spacing.small} 0;
  }

  h1 {
    font-size: ${fonts.sizeH1};
    font-weight: 400;
  }

  h2 {
    font-size: ${fonts.sizeH2};
    font-weight: 400;
  }

  h3 {
    font-size: ${fonts.sizeH3};
  }

  h4 {
    font-size: ${fonts.sizeH4};
  }

  h5 {
    font-size: ${fonts.sizeH5};
  }

  h6 {
    font-size: ${fonts.sizeH6};
  }

`;
