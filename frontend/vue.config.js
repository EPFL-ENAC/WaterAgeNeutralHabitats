module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Water Age Neutral Habitats";
      return args;
    });
  },
  devServer: {
    proxy: {
      "^/data": {
        target: "http://localhost:8081/",
        pathRewrite: { "^/data": "" },
      },
    },
  },
};
