const { defineConfig } = require("@vue/cli-service");
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/styles/styles.scss";`,
      },
    },
  },
};

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
