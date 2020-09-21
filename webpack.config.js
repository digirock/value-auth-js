const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js",
        library: 'ValueAuth',
        libraryTarget: 'umd',
        path: path.resolve(process.cwd() + "/dist")
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [path.resolve(__dirname, "src"), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ],
    },
    target: "node"
};
