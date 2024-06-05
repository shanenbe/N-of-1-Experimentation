const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './___BUILD_LIB_FILE_TestExperiment/API_PROVIDER_FOR_WEBPACK_LIB_GENERATION.js',
    output: {
        // path:'./',
        path: path.resolve(__dirname, './'),
        filename: './___BUILD_LIB_FILE_TestExperiment/nof1experimentation.js',
    },
    resolve: {
        fallback: { "crypto": false }
    }
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'TestExperiment',
    //         filename: 'index.html',
    //         inject: true
    //     })
    // ]

};