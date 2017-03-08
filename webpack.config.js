var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
    entry: APP_DIR + '/Main.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                include: APP_DIR,
                loaders: ['babel-loader']
            }
        ]
    }
};

module.exports = config;