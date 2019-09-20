const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Main const
const PATHS = {
    src: path.join(__dirname, './src'),
    public: path.join(__dirname, './public'),
};

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app : './src/index.js',
        app : './src/styles/scss/style.scss'
    },

    output: {
        filename: "js/[name].min.js",
        path: PATHS.public,
        /*path : path.join(__dirname, 'public', 'js'),*/
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'

                },
            },{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }, {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            },{
                test: /\.css$/,
                use: ['style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true, config: { path: `./postcss.config.js` } }
                    }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
        }),
      /*  new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),

        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/static`, to: '' },
        ]),
        new HtmlWebpackPlugin({
            template: `${PATHS.src}/index.html`
        })*/
    ]
};