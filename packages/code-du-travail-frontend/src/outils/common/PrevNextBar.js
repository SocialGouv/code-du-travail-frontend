import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, theme } from "@socialgouv/react-ui";
import printResult from "./printResult";

function PrevNextBar({
  onPrev,
  hasError,
  nextVisible,
  printVisible,
  previousVisible
}) {
  return (
    <>
      <Box>
        {printVisible && (
          <StyledButton onClick={printResult}>
            Imprimer le résultat
          </StyledButton>
        )}
        {nextVisible && (
          <StyledButton disabled={hasError} variant="primary">
            Suivant
          </StyledButton>
        )}
        {previousVisible && (
          <StyledButton type="button" onClick={onPrev} variant="flat">
            Précédent
          </StyledButton>
        )}
      </Box>
    </>
  );
}
PrevNextBar.propTypes = {
  onPrev: PropTypes.func,
  hasError: PropTypes.bool,
  nextVisible: PropTypes.bool,
  previousVisible: PropTypes.bool
};
PrevNextBar.defaultProps = {
  onPrev: () => {},
  hasError: false,
  nextVisible: true,
  previousVisible: true
};

export { PrevNextBar };

const { breakpoints, spacings } = theme;

const StyledButton = styled(Button)``;

const Box = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: ${spacings.large} 0;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: column;
    align-items: stretch;
      /* stylelint-disable-next-line */
    ${StyledButton} + ${StyledButton} {
      margin-top: ${spacings.base};
    }
  }
  @media print {
    display: none;
  }
`;
