const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' //실제는 .env, 개발은 .env.dev사용
  ),
});

module.exports = {
  entry: `${path.resolve(__dirname, '../src')}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new VanillaExtractPlugin({}),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      'track-1-form-with-react-hook-form': path.resolve(
        __dirname,
        '../../../node_modules/track-1-form-with-react-hook-form/dist/lib'
      ),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
