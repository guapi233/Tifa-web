module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
      sass: {
        prependData: `@import "./src/config/globalTheme.scss";`,
      },
    },
  },
};
