const withTM = require("next-plugin-transpile-modules");
const withCSS = require("@zeit/next-css");
const flow = require("lodash.flow");

module.exports = flow(
  withCSS,
  // ? NOTE(douglasduteil): "withTM" has to be the last one here
  // ? see https://www.npmjs.com/package/next-plugin-transpile-modules#usage
  withTM
)({
  transpileModules: ["@cdt/ui"],
  // https://github.com/zeit/next.js/#disabling-file-system-routing
  useFileSystemPublicRoutes: false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg|gif|jpg)$/,
      loader: "file-loader",
      options: {
        publicPath: "/_next/static/",
        outputPath: "static/"
      }
    });
    return config;
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
    SENTRY_PUBLIC_DSN: process.env.SENTRY_PUBLIC_DSN,
    PIWIK_URL: process.env.PIWIK_URL,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    NODE_ENV: process.env.NODE_ENV
  }
});
