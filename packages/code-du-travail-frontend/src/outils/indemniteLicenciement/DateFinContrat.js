import React from "react";
import PropTypes from "prop-types";
import { Container, Section } from "@cdt/ui";

import { inputStyle } from "./index";
import { PrevNextStepper } from "./PrevNextStepper";

class DateFinContrat extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    nextDisabled: PropTypes.bool
  };
  static defaultProps = {
    value: false,
    nextDisabled: false
  };

  render() {
    const { onChange, value, onPrevious, onNext, nextDisabled } = this.props;
    return (
      <React.Fragment>
        <Section light>
          <React.Fragment>
            <h2>
              Est ce que la date de fin de votre contrat se situe avant le
              <b>26 Août 2017</b>
              &nbsp;?
            </h2>
            <label>
              <input
                type="radio"
                onChange={() => onChange(true)}
                name="isR12342"
                checked={value === true}
              />{" "}
              Oui
            </label>
            <label>
              <input
                type="radio"
                onChange={() => onChange(false)}
                name="isR12342"
                checked={value === false}
              />{" "}
              Non
            </label>
          </React.Fragment>
        </Section>
        <Container>
          <PrevNextStepper
            onPrev={onPrevious}
            onNext={onNext}
            nextDisabled={nextDisabled}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export { DateFinContrat };
