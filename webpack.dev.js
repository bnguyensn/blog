/** ********** WEBPACK CONFIG FILE 2/3 ********** **/

const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// The main config
module.exports = () => {

    // Loader constants
    const imgLoaderSizeLimit = 1024 * 10;  // 10kb

    // Main config
    return merge(common, {

        mode: 'development',  // webpack 4.0

        output: {
            publicPath: '/',  // Different from prod config
            filename: '[name].js',  // Different from prod config
            chunkFilename: '[name].js',  // Different from prod config
        },

        module: {
            rules: [
                /* .css - We use ExtractTextPlugin for prod. This plugin can't be used in dev because
                 * it does not work with HotModuleReplacement
                 */
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                /*modules: true,  // TODO: implement CSS modules
                                 localIdentName: '[chunkhash]'*/
                                importLoaders: 2
                            }
                        },
                        'postcss-loader',
                        'sass-loader'
                    ],
                    exclude: /node_modules/
                },

                // Images (PNG | JPG | GIF)
                {
                    test: /\.(png|jpe?g|gif)$/,
                    use: {
                        loader: 'url-loader',  // url-loader has automatic file-loader fallback
                        options: {
                            limit: imgLoaderSizeLimit,
                            name: 'assets/[name].[ext]'  // Different from prod config
                        }
                    }, //`url-loader?limit=${urlLoaderSizeLimit}&name=assets/[chunkhash].[ext]`,
                    exclude: /node_modules/
                },

            ]
        },

        plugins: [
            // Define environment - not needed
            // webpack 4.0: now has mode. Environment variables are defaulted with mode as well

            // Webpack caching: webpack 4.0 -> this is optimization.namedModules (on by default in development mode

            // Hot Module Replacement
            new webpack.HotModuleReplacementPlugin(),
        ],

        devtool: 'inline-source-map',

        devServer: {
            // The location of the html files for webpack-dev-server. NOTE: can be an array
            contentBase: path.join(__dirname, 'src'),

            compress: true,
            port: 8082,
            overlay: {
                errors: true,
                warnings: true
            },
            staticOptions: {  // Options for serving static files. Follow express rules. See official docs.
                extensions: ['html']  // This is needed to serve html files other than 'index.html'.
            },
            proxy: {  // Because we are involving (note: not using) an Express dev server
                //"/": "http://localhost:63345"
            },
            historyApiFallback: {
                rewrites: [
                    // Redirects homepage-related URLs
                    { from: '/', to: '/dashboard.html' },
                    /*{ from: '/archive', to: '/index.html' },
                    { from: '/projects', to: '/index.html' },
                    { from: '/contact', to: '/index.html' },
                    { from: '/404', to: '/index.html' },*/
                ]
            },

            // Hot Module Replacement
            hot: true,

            // TODO: optimization is currently invalid for webpack-dev-server. Check back later
            /*optimization: {
                // namedModules is on by default for development
                namedModules: true
            }*/
        }
    });
};