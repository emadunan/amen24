import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
  ],
  external: [
    "@reduxjs/toolkit",
    "react-redux",
    "i18next",
    "react",
    "react-dom",
    "react-toastify",
    "react-i18next",
    "react-icons",
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    esbuild({
      include: /\.[jt]sx?$/,
      exclude: /node_modules/,
      sourceMap: true,
      minify: false,
      target: "es2017",
      jsx: "automatic",
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      modules: true,
      extract: "index.css",
      minimize: true,
      sourceMap: true,
      plugins: [postcssPresetEnv(), autoprefixer()],
    }),
  ],
};
