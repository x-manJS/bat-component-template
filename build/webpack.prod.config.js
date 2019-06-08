
var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const envConf = require('../config/prod.env');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js',
    libraryTarget: 'umd', // 组件被引用才会显得是组件

  },
  module: {
    rules: [
      { test: /\.pug$/, use: ['pug-plain-loader'] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff)$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]?[hash]' }
      }, {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  cache: true,

  externals: {
    'vue': 'Vue',
    'element-ui': 'ELEMENT'
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': envConf
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ]
}

module.exports.mode = "production";
console.info('您正在发布生产版本...');
