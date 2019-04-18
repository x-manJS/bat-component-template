
var path = require('path')
var webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const envConf = require('../config/dev.env');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'build.js'
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
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,

    host: JSON.parse(envConf.SERVER_HOST),
    // host: '192.168.31.116',
    // host: '192.168.31.116',
    proxy: {
      '/api/*': {
        target: 'http://localhost:50564/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
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
    new webpack.DefinePlugin({'process.env': envConf}),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: path.resolve(process.cwd(), "node_modules"),
          name: "vendor",
          enforce: true
        },
      }
    }
  }
}



module.exports.mode = "development";
console.info('当前版本为开发环境...');
console.info(`open address ${envConf.SERVER_HTTP}`);