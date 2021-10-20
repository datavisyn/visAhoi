import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import postcssImport from "postcss-import";
import postcss from 'rollup-plugin-postcss';
import autoPreprocess from 'svelte-preprocess';

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
    svelte({
      dev: !production,
      emitCss: true,
      preprocess: autoPreprocess(),
    }),
    // process css in .svelte files
    postcss({
      extract: 'css/svelte-bundle.css',
      minimize: Boolean(!production)
    }),
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
},
{
  // process css files
  input: './src/css/main.css',
  output: [{
    format: 'es',
    dir: './dist/css'
  }, {
    format: 'es',
    file: './build/css/main.css'
  }],
  plugins: [
    postcss({
      plugins: [postcssImport({ extensions: ['.css'] })],
      extract: true,
      to: "./build/css/main.css",
      minimize: Boolean(!production)
    }),
    nodeResolve({
      browser: true,
      dedupe: ['svelte'],
      extensions: ['.css']
    })
  ]
}];
