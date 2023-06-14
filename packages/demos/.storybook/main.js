const sveltePreprocess = require("svelte-preprocess");
// const { mergeConfig } = require("vite");

module.exports = {
  // webpackFinal: async (config) => {
  //   const svelteLoader = config.module.rules.find(
  //     (r) => r.loader && r.loader.includes("svelte-loader")
  //   );
  //   svelteLoader.options.preprocess = require("svelte-preprocess")({});
  //   return config;
  // },
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  core: {
    builder: "webpack5",
    //   builder: "@storybook/builder-vite", // 👈 The builder enabled here.
  },
  // async viteFinal(config) {
  //   // Merge custom configuration into the default config
  //   return mergeConfig(config, {
  //     // Use the same "resolve" configuration as your app
  //     resolve: (await import("../vite.config.js")).default.resolve,
  //     // Add dependencies to pre-optimization
  //     // optimizeDeps: {
  //     //   include: ["storybook-dark-mode"],
  //     // },
  //   });
  // },
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf",
    "@storybook/addon-storysource",
  ],
  framework: "@storybook/svelte",
  // svelteOptions: {
  //   preprocess: preprocess({
  //     typescript: true,
  //     postcss: true,
  //     sourceMap: true,
  //   }),
  // },

  // svelteOptions: {
  //   preprocess: sveltePreprocess({
  //     babel: {
  //       presets: [
  //         [
  //           "@babel/preset-env",
  //           {
  //             loose: true,
  //             modules: false,
  //             targets: {
  //               esmodules: true,
  //             },
  //           },
  //         ],
  //       ],
  //     },
  //   }),
  // },
};
