// const sveltePreprocess = require ('svelte-preprocess');

module.exports = {
  "webpackFinal": async  (config) => {
    const svelteLoader = config.module.rules.find(
      (r) => r.loader && r.loader.includes("svelte-loader"),
    )
    svelteLoader.options.preprocess = require("svelte-preprocess")({})
    return config
  },
  "stories": [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-storysource"
  ],
  "framework": "@storybook/svelte",
  
  // svelteOptions: {
  //   preprocess: sveltePreprocess({
  //     babel: {
  //       presets: [
  //         [
  //         '@babel/preset-env',
  //         {
  //           loose: true,
  //           modules: false,
  //           targets: {
  //             esmodules: true,
  //           }
  //         }
  //       ]
  //     ]
  //     }
  //   })
  // }
  
}
