import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

export default {
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
      preprocess: sveltePreprocess(),
    }),
    css({ output: null }),
    resolve({
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
};
