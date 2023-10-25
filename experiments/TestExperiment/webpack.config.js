const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: 'C:/Users/Stefan/sciebo/Development/Webstorm/Experimentation/build/experiments/TestExperiment/TestExperiment.js',
    output: {
        path:'C:/Users/Stefan/sciebo/Development/Webstorm/Experimentation/build/experiments/TestExperiment/',
        filename: 'lib.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TestExperiment',
            filename: 'index.html',
            inject: true
        })
    ]

};