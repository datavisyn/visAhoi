import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import postcssImport from "postcss-import";

const production = !process.env.ROLLUP_WATCH;

export default [{
  input: './src/index.ts',
  output: [{
    sourcemap: true,
    format: 'esm',
    exports: "named",
    dir: './dist'
  }, {
    sourcemap: true,
    format: 'iife',
    file: './build/bundle.js'
  }],
  plugins: [
    svelte(),
    css({ output: null }),
    nodeResolve({
      browser: true,
      dedupe: ['svelte']
    }),
    commonjs(),
    typescript({
      sourceMap: !production,
      inlineSources: !production
    }),
    !production && livereload('dist'),
  ],
}, {
  input: './src/css/main.css',
  output: [{
    format: 'es',
    dir: './dist/css',
    name: 'test'
  }, {
    format: 'es',
    file: './build/css/main.css'
  }],
  plugins: [
    postcss({
      plugins: [postcssImport({extensions: ['.css']})],
      extract: true,
      to: "./build/css/main.css"
    })
  ]

}];
