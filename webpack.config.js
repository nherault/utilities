const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'class-utility': path.join(__dirname, '/src/class-utility/index.ts'),
        'dom-utils': path.join(__dirname, '/src/dom-utils/index.ts'),
        'form-contract': path.join(__dirname, '/src/form-contract/index.ts'),
        'pool': path.join(__dirname, '/src/pool/index.ts'),
        'sorting': path.join(__dirname, '/src/sorting/index.ts'),
        'state-utils': path.join(__dirname, '/src/state-utils/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, '_bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'MyLib',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};