/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_DIR = path.resolve(__dirname, './web');

module.exports = env => {
  const {
    PLATFORM,
    VERSION
  } = env;
  return merge([{
    entry: {
      main: ['@babel/polyfill', APP_DIR]
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: path.join(__dirname, 'config/webpack_ant_warning_loader.js'),
          include: path.join(process.cwd(), './node_modules/rc-form/')
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: [
            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(less)$/,
          use: [
            PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            "less-loader"
          ]
        },
        {
          test: /\.(ts|tsx|web.tsx)?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: [
                  "babel-plugin-styled-components"
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.web.json',
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                    style: 'css'
                  })]
                }),
                reportFiles: [
                  'web/**/*.{ts,web.tsx}',
                  'common/**/*.{ts,web.tsx}',
                  'common/screens/**/*.{tsx}',
                ]
              },
            },
          ],
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      alias: {
        Common: path.resolve(__dirname, 'common/'),
        X: path.resolve(__dirname, 'common/components'),
        S: path.resolve(__dirname, 'common/screens'),
      },
      extensions: ['.web.tsx', '.tsx', '.js', '.ts'],
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'web/static'
      }]),
      new HtmlWebpackPlugin({
        template: './web/index.html',
        filename: './index.html'
      }),
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(env.VERSION),
        'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
        'process.env.TARGET_DEVICE': JSON.stringify("web")
      }),

    ],

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    }

  }])
};
