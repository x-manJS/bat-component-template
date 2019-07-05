var path = require("path");
var webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const envConf = require("../config/prod.env");
const rules = require("../config/rules");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
    filename: "build.js",
    libraryTarget: "umd" // 组件被引用才会显得是组件
  },
  module: {
    rules: rules
  },
  resolve: {
    extensions: [".ts", ".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  performance: {
    hints: false
  },
  devtool: "#source-map",
  cache: true,

  externals: {
    vue: "Vue",
    "element-ui": "ELEMENT"
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": envConf
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ]
};

module.exports.mode = "production";
console.info("您正在发布生产版本...");
