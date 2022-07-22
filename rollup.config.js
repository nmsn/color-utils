// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/bundle.umd.js",
      format: "umd",
      name: 'bundle',
      sourcemap: true,
    },
  ],
  plugins: [typescript(), commonjs(), nodeResolve()],
};
