import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Stripe } from "../../Stripe";
import { breakpoints, fonts, spacings } from "../../theme";

export const Heading = ({ children, stripped = false, variant, ...props }) => (
  <StyledHeading stripped={stripped} {...props}>
    {stripped && (
      <Stripe
        rounded={variant !== "primary"}
        variant={variant}
        position="left"
        length="100%"
      />
    )}
    {children}
  </StyledHeading>
);

Heading.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  shift: PropTypes.string,
  stripped: PropTypes.bool,
  variant: PropTypes.string
};

Heading.defaultProps = {
  variant: "secondary"
};

const StyledHeading = styled.h3`
  position: relative;
  margin: 0 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
  line-height: ${fonts.lineHeightTitle};
  ${({ stripped, shift }) => {
    if (stripped) {
      return css`
        margin-left: ${shift ? `-${shift}` : "0"};
        padding-left: ${shift ? shift : spacings.base};
        @media (max-width: ${breakpoints.mobile}) {
          margin-left: -${spacings.small};
          padding-left: ${spacings.base};
        }
      `;
    }
  }};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
