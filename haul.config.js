import {
  createWebpackConfig
} from "haul";
const resolve = require('./webpack.config.resolve');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const deepmerge = (t, s) => {
  let o = Object,
    a = o.assign;
  for (let k of o.keys(s)) s[k] instanceof o && a(s[k], deepmerge(t[k], s[k]));
  return a(t || {}, s), t
};

//TODO: adjust this in the scripts
let PLATFORM = 'development';

export default {
  webpack: env => {
    const config = createWebpackConfig({
      entry: `./index.js`,
    })(env);

    console.log("config.resolve: ", config.resolve);

    /*     config.plugins.push(new CaseSensitivePathsPlugin()); */

    config.module.rules.push({
        test: /\.(css|scss)$/,
        use: [
          PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(mjs|js|jsx)$/,

        loader: 'babel-loader',
        options: {
          presets: [

            {
              plugins: [
                '@babel/plugin-proposal-class-properties'
              ]
            }
          ]
        }
      },

      {
        test: /\.(ts|tsx)?$/,
        options: {
          configFile: 'tsconfig.mobile.json',
          reportFiles: [
            'mobile/**/*.{ts,tsx}',
            'common/**/*.{ts,tsx}'
          ]
        },
        loader: "ts-loader"
      }

    );

    // config.resolve = resolve;

    config.resolve = deepmerge(config.resolve, resolve);

    console.log("config.resolve new: ", config.resolve);

    return config;
  }
};
