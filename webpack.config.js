const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'app.bundle.js'
    },
    devServer: {
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader", "eslint-loader"]

            },
            {
                test: /\.pug$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        minify: false,
                        minimize: false
                    }

                }, "pug-html-loader"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test vTex",
            template: "./src/index.pug",
            minify: {
                collapseWhitespace: false,
            },
            hash: true,
            filename: "index.html"
        }),
        new ExtractTextPlugin('style.css')
    ]
}