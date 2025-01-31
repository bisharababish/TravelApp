const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
    const isProduction = env.NODE_ENV === 'production';

    return {
        mode: isProduction ? 'production' : 'development',
        entry: './client/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
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
            ...(isProduction
                ? [
                    new WorkboxPlugin.GenerateSW({
                        clientsClaim: true,
                        skipWaiting: true,
                    }),
                ]
                : []),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
        },
    };
};