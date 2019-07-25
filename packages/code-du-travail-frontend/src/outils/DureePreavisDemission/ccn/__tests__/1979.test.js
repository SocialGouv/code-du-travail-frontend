import React from "react";
import { render } from "react-testing-library";
import { Form } from "react-final-form";

import {
  Step1979,
  Result1979,
  computePreavis,
  EMPLOYEE,
  MASTER,
  MANAGER,
  LESS_THAN_6_MONTH,
  BETWEEN_6_AND_24_MONTH,
  MORE_THAN_24_MONTH
} from "../1979";

describe("<Step1979 />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Step1979 />} />
    );
    expect(container).toMatchSnapshot();
  });
});

describe("<Result1979 />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        onSubmit={onSubmit}
        initialValues={{
          branche: "1979",
          category: MANAGER,
          seniority: MORE_THAN_24_MONTH
        }}
        render={({ form }) => <Result1979 form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

describe("computePreavis", () => {
  const cases = [
    [EMPLOYEE, LESS_THAN_6_MONTH, "8 jours"],
    [EMPLOYEE, BETWEEN_6_AND_24_MONTH, "15 jours"],
    [EMPLOYEE, MORE_THAN_24_MONTH, "1 mois"],
    [MASTER, LESS_THAN_6_MONTH, "15 jours"],
    [MASTER, BETWEEN_6_AND_24_MONTH, "1 mois"],
    [MASTER, MORE_THAN_24_MONTH, "1 mois"],
    [MANAGER, LESS_THAN_6_MONTH, "1 mois"],
    [MANAGER, BETWEEN_6_AND_24_MONTH, "3 mois"],
    [MANAGER, MORE_THAN_24_MONTH, "3 mois"]
  ];
  test.each(cases)(
    "compute preavis for %s",
    (category, seniority, expected) => {
      expect(computePreavis({ category, seniority })).toBe(expected);
    }
  );
});
