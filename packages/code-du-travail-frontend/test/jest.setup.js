import "jest-styled-components";
import Intl from "intl";
import MockDate from "mockdate";

MockDate.set("2020-1-4");

jest.mock("next/config", () => () => ({
  publicRuntimeConfig: {
    API_SIRET2IDCC_URL: "siret2idcc.url",
    API_ENTREPRISE_URL: "api-entreprises.url",
    API_URL: "api.url",
    PACKAGE_VERSION: "vX.Y.Z",
    SENTRY_PUBLIC_DSN: "https://xxxxxxx@sentry.test.com/n",
  },
}));

/**
 * this removes the reach-ui warning that check modal css import
 */
// eslint-disable-next-line import/no-extraneous-dependencies
require("@reach/utils").checkStyles = jest.fn();

window.scrollTo = jest.fn();
