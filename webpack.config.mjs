import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack'; 
import { GenerateSW } from 'workbox-webpack-plugin';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Determine the mode (development or production)
const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: isProduction ? 'production' : 'development', 
  entry: './client/index.js',
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/views/index.html',
    }),
    new webpack.DefinePlugin({
      // Use webpack.DefinePlugin to inject environment variables
      'process.env': JSON.stringify({
        REACT_APP_GEONAMES_USERNAME: process.env.REACT_APP_GEONAMES_USERNAME,
        REACT_APP_WEATHERBIT_API_KEY: process.env.REACT_APP_WEATHERBIT_API_KEY,
        REACT_APP_PIXABAY_API_KEY: process.env.REACT_APP_PIXABAY_API_KEY,
      }),
    }),
    // Only add GenerateSW in production mode
    ...(isProduction
      ? [
        new GenerateSW({
          clientsClaim: true,
          skipWaiting: true,
        }),
      ]
      : []),
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'),
    },
    compress: true,
    port: 9001,
    hot: true,
  },
};