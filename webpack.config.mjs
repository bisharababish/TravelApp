import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { GenerateSW } from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dotenv from 'dotenv';
import CopyPlugin from 'copy-webpack-plugin';

// Load environment variables from .env file
dotenv.config();

// Determine the mode (development or production)
const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: isProduction ? 'production' : 'development',
  entry: './client/index.js', // Entry point for your JavaScript
  output: {
    path: path.resolve(process.cwd(), 'dist'), // Output directory
    filename: 'bundle.js', // Output JavaScript file
    publicPath: '/', // Ensure assets are served from the root
    clean: true, // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Handle SCSS files
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Extract CSS in production
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.js$/, // Handle JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/views/index.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file name
    }),
    new webpack.DefinePlugin({
      // Use webpack.DefinePlugin to inject environment variables
      'process.env': JSON.stringify({
        REACT_APP_GEONAMES_USERNAME: process.env.REACT_APP_GEONAMES_USERNAME,
        REACT_APP_WEATHERBIT_API_KEY: process.env.REACT_APP_WEATHERBIT_API_KEY,
        REACT_APP_PIXABAY_API_KEY: process.env.REACT_APP_PIXABAY_API_KEY,
        NODE_ENV: process.env.NODE_ENV || 'development',
      }),
    }),
    // Copy the service-worker.js file to dist directory
    new CopyPlugin({
      patterns: [
        {
          from: './client/service-worker.js',
          to: 'service-worker.js',
          noErrorOnMissing: true, // Don't throw an error if the file is missing
        },
      ],
    }),
    // Extract CSS into a separate file in production
    ...(isProduction
      ? [
        new MiniCssExtractPlugin({
          filename: 'styles.css', // Output CSS file name
        }),
      ]
      : []),
    // Only add GenerateSW in production mode
    ...(isProduction
      ? [
        new GenerateSW({
          clientsClaim: true, // Claim clients immediately
          skipWaiting: true, // Skip waiting for the old service worker
          swDest: 'service-worker.js', // Output service worker file name
          exclude: [/.DS_Store/, /\.map$/, /\.git/],
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//], // Don't use the fallback for API requests
          runtimeCaching: [
            {
              urlPattern: new RegExp('api\\.geonames\\.org|api\\.weatherbit\\.io|pixabay\\.com'),
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60, // 1 hour
                },
              },
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
              },
            },
            {
              urlPattern: /\.(?:js|css|html)$/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'static-resources',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 24 * 60 * 60, // 1 day
                },
              },
            },
          ],
        }),
      ]
      : []),
  ],
  devServer: {
    static: {
      directory: path.join(process.cwd(), 'dist'), // Serve files from the 'dist' folder
    },
    compress: true,
    port: 9001, // Dev server port
    hot: true, // Enable hot module replacement (HMR)
    historyApiFallback: true, // Enable for SPA routing
  },
};