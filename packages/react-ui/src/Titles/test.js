import React from "react";
import { render } from "@testing-library/react";
import { Heading, PageTitle, Subtitle, Title } from ".";

describe("<PageTitle />", () => {
  it("renders a H1 page title ", () => {
    const { container } = render(
      <PageTitle>Lorem Ipsum</PageTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
describe("<Title />", () => {
  it("renders a H2 title ", () => {
    const { container } = render(<Title>Lorem Ipsum</Title>);
    expect(container).toMatchSnapshot();
  });
});
describe("<Heading />", () => {
  it("renders a H3 heading ", () => {
    const { container } = render(<Heading>Lorem Ipsum</Heading>);
    expect(container).toMatchSnapshot();
  });
describe("<Subtitle />", () => {
  it("renders a subtitle ", () => {
    const { container } = render(<Subtitle>Lorem Ipsum</Subtitle>);
    expect(container).toMatchSnapshot();
  });
});
