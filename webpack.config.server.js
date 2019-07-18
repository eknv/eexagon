const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const resolve = require('./webpack.config.resolve');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv === 'production';
const isTest = nodeEnv === 'test';
const isDevelopment = nodeEnv === 'development';

if(nodeEnv !== 'production' && nodeEnv !== 'test' && nodeEnv !== 'development') {
  throw new Error("NODE_ENV is not provided!")
}

const dotenv = require('dotenv').config({
  path: isProduction ? '.env.prod' : isTest? '.env.test' : '.env'
});

const APP_DIR = path.resolve(__dirname, './server');

const final_env = {};
for (var property in dotenv.parsed) {
  if (dotenv.parsed.hasOwnProperty(property)) {
    final_env[property] = JSON.stringify(dotenv.parsed[property]);
  }
}


final_env["NODE_ENV"] = JSON.stringify(nodeEnv);

/**
 * plugin config
 */
let plugins = [
  new webpack.DefinePlugin({
    'process.env': final_env,
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false
  }),
];

module.exports = {
  context: APP_DIR,
  mode: 'development',
  devtool: 'source-map',
  externals: [nodeExternals()],
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: [
    'babel-polyfill',
    APP_DIR
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)?$/,
      options: {
        configFile: 'tsconfig.server.json',
        reportFiles: [
          'server/**/*.{ts,tsx}',
          'common/**/*.{ts,tsx}'
        ]
      },
      loader: "ts-loader"
    }],
  },
  resolve,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  }
};
