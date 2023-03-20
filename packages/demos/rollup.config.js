import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import postcssImport from "postcss-import";
import postcss from "rollup-plugin-postcss";
import InlineSvg from "rollup-plugin-inline-svg";
import copy from "rollup-plugin-copy-assets";
import preprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: "./src/main.ts",
    output: [
      {
        sourcemap: true,
        format: "umd",
        dir: "./dist",
        name: "demos",
      },
      {
        sourcemap: true,
        format: "esm",
        file: "./build/bundle.js",
        name: "demos",
      },
    ],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    plugins: [
      svelte({
        emitCss: true,
        preprocess: preprocess(),
      }),
      // process css in .svelte files
      postcss({
        extract: "css/svelte-bundle.css",
        minimize: Boolean(!production),
      }),
      nodeResolve({
        browser: true,
        dedupe: ["svelte"],
      }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }),
      !production && livereload("dist"),
      json(),
      InlineSvg({
        include: ["src/assets/*.svg"],
      }),
      copy({
        assets: [
          // You can include directories
          "src/assets",
        ],
      }),
    ],
  },
  {
    // process css files
    input: "./src/css/main.css",
    output: [
      {
        format: "es",
        dir: "./dist/css",
      },
      {
        format: "es",
        file: "./build/css/main.css",
      },
    ],
    plugins: [
      postcss({
        plugins: [postcssImport({ extensions: [".css"] })],
        extract: true,
        to: "./build/css/main.css",
        minimize: Boolean(!production),
      }),
      nodeResolve({
        browser: true,
        dedupe: ["svelte"],
        extensions: [".css"],
      }),
    ],
  },
];
