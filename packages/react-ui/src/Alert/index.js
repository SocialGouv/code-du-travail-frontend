import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, spacings } from "../theme";

export const Alert = styled.div`
  margin-bottom: ${spacings.base};
  padding: ${spacings.small} ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  background-color: ${({ theme }) => theme.bgSecondary};
  border: 1px solid transparent;
  ${props => {
    if (props.variant === "primary") {
      return css`
        border-color: ${({ theme }) => theme.primary};
      `;
    }
  }}
  border-radius: ${box.borderRadius};
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

Alert.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  children: PropTypes.node.isRequired
};

Alert.defaultProps = {
  variant: "secondary"
};
