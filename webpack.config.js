const path = require('path');

const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
    devtool: isProd ? 'hidden-source-map' : 'cheap-module-source-map',
    entry: './scripts/app.js',
    watch: true,
    output: {
        path: path.join(__dirname),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { // eslint-disable-line quote-props
                NODE_ENV: JSON.stringify(nodeEnv)
            }
        })
    ],
    externals: ['sqlite3'],
    target: 'electron'
};