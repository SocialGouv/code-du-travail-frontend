// this is basically: afterEach(cleanup)
import "react-testing-library/cleanup-after-each";

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_URL: "api.url",
    API_ADDRESS: "addresse-api.data"
  }
}));
jest.mock("react-piwik", () => ({
  push: jest.fn()
}));

// HACK(lionelB): trick to prevent @reach-modal warning if styles are not imported
// jsdom doesn"t support it for now @see https://github.com/jsdom/jsdom/issues/1895
// We will be able to use :
// document.documentElement.style.setProperty("--reach-modal", "1");
// when jsdom support it :)
//
// Meanwhile...
//
// HACK(douglasduteil): mock the check style function from `@reach/utils`
// As `@reach/*` packages are usion the "checkStyles" function from `@reach/utils`
// to warn us about missing stylesheet, we silent it with a mock 💩
require("@reach/utils").checkStyles = jest.fn();
