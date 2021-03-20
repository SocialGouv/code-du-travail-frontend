import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import { dependencies, peerDependencies } from "./package.json";

export default {
  external: (id) =>
    dependencies[id] || peerDependencies[id] || id.startsWith("date-fns/"),
  input: "src/index.js",
  output: [
    {
      file: "lib/index.js",
      format: "cjs",
    },
    {
      file: "lib/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [babel({ babelHelpers: "bundled" }), nodeResolve(), commonjs()],
  watch: {
    include: "src/**",
  },
};
