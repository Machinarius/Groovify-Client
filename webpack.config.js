const path = require("path");

const DotEnvPlugin = require("dotenv-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: path.resolve(__dirname, "src", "Index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    resolve: {
        extensions: [".wasm", ".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
        alias: {
            "@": path.resolve("src"),
        }
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [{
                loader: "ts-loader"
            }]
        }, {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        }]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new DotEnvPlugin(),
        new CopyPlugin([{ 
            from: "./node_modules/react/umd/react.development.js",
            to: "./vendor/react.development.js"
        }, {
            from: "./node_modules/react-dom/umd/react-dom.development.js",
            to: "./vendor/react-dom.development.js"
        }]),
        new HtmlWebpackPlugin(),
        new HtmlWebpackTagsPlugin({
            tags: [ 
                "https://apis.google.com/js/api.js",
                "./vendor/react.development.js", 
                "./vendor/react-dom.development.js" 
            ],
            append: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        allowedHosts: [
            ".localtest.me"
        ]
    }
}