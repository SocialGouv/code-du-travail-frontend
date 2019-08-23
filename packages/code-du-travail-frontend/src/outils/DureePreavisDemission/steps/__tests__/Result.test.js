import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render CC answer", () => {
    const { container } = renderForm(StepResult, {
      branche: "0044",
      catégorie: "Ingénieur, Cadre",
      groupe: "V"
    });
    expect(container).toMatchSnapshot();
  });
  it("should render with no cc", () => {
    const { container } = renderForm(StepResult, {
      branche: "0000"
    });
    expect(container).toMatchSnapshot();
  });
});
