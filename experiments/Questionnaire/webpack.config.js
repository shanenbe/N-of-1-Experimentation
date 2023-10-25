const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: 'C:/Users/Stefan/sciebo/Development/Webstorm/Experimentation/build/experiments/Questionnaire/Questionnaire.js',
    output: {
        path:'C:/Users/Stefan/sciebo/Development/Webstorm/Experimentation/build/experiments/Questionnaire/',
        filename: 'code.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Questionnaire',
            filename: 'index.html',
            template: 'C:/Users/Stefan/sciebo/Development/Webstorm/Experimentation/build/experiments/Experiment_Template.html',
            inject: true
        })
    ]

};