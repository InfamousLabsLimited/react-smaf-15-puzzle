var webpack = require('webpack');

var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

var TARGET = process.env.npm_lifecycle_event;
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

var common = {

    entry: {
        bundle: [path.resolve(ROOT_PATH, 'src/js/main.js')]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'public'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [path.resolve(ROOT_PATH, 'src')],
                exclude: /smaf\.js/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Smaf \'15 Puzzle\' React App',
            description: 'Smaf demo app for the popular 15 puzzle game, created with React.js and the Smaf SDK.',
            keywords: 'smaf, react, 15 puzzle',
            template: 'src/base-template.html',
            favicon: 'src/favicon.ico',
            inject: 'body',
            filename: 'index.html'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            contentBase: './public',
            historyApiFallback: true,
            hot: true,
            inline: true,
            port: 33000,
            progress: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({url: 'http://localhost:33000'})
        ]
    });
}

if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            })
        ]
    });
}