import React from "react";
import styled from "styled-components";

import { Field } from "react-final-form";
import { isNumber } from "./validators";
import { Input, InlineError } from "../common/stepStyles";
import { theme } from "@socialgouv/react-ui";

function CurrencyField({ name, label, children = null, ...inputProps }) {
  return (
    <Field
      name={name}
      validate={isNumber}
      subscription={{ value: true, error: true, touched: true, invalid: true }}
    >
      {({ input, meta: { touched, error, invalid } }) => (
        <>
          {label && <p>{label}</p>}
          <CurrencyWrapper>
            <NumberInput
              {...inputProps}
              {...input}
              type="number"
              size="10"
              invalid={touched && invalid}
            />
            <Currency aria-hidden="true">€</Currency>
          </CurrencyWrapper>
          {children}
          {error && touched && invalid ? (
            <InlineError>{error}</InlineError>
          ) : null}
        </>
      )}
    </Field>
  );
}

export { CurrencyField };

const { colors, spacing } = theme;
const NumberInput = styled(Input)`
  text-align: right;
  padding-right: ${spacing.base};
`;

const CurrencyWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-right: ${spacing.base};
`;

const Currency = styled.span`
  color: ${colors.grey};
  position: absolute;
  right: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
`;
