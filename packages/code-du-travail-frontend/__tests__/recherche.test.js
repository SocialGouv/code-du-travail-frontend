import React from "react";
import { render } from "@wrapped-testing-library/react";
import Recherche from "../pages/recherche.js";

describe("<Recherche />", () => {
  it("should render", () => {
    const { container } = render(<Recherche />);
    expect(container).toMatchSnapshot();
  });
});
