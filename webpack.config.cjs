const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: "inline-source-map",
    mode: 'production',
    output: {
        path: path.resolve(__dirname, './lib'),
        filename: './nof1experimentation.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        fallback: { "crypto": false },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
