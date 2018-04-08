/** ********** WEBPACK CONFIG FILE 1/3 ********** **/

const path = require('path');
const WebpackMd5Hash = require('webpack-md5-hash');

/* Special Note:
   For some reason, webpack.common.js cannot be a function that export a config
   The console will return  "Configuration file found but no entry configured"
   Hence we have to leave global variables out here
*/

// Other constants
const imgLoaderSizeLimit = 1024 * 10;  // 10kb

// The main config
module.exports = {
    entry: {
        authentication: './src/authentication.js',
        dashboard: './src/dashboard.js',
    },

    output: {
        path: path.join(__dirname, 'dist/static'),
    },

    module: {
        // Loaders config for various file types
        rules: [
            // .css - Implemented differently for prod and dev. Please refer to these configs.

            // .js
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },

            // Images (PNG | JPG | GIF) - Implemented differently for prod and dev. Please refer to these configs.

            // Images (SVG)
            {
                test: /\.(svg)$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        limit: imgLoaderSizeLimit,
                        noquotes: true  // Remove quotes around the encoded URL
                    }
                },
                exclude: /node_modules/
            },

            // Images compression
            // image-webpack-loader must work in pair with url-loader / svg-url-loader
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'image-webpack-loader',
                },
                // enforce: 'pre' is a webpack option that forces this loader to load first
                // (in this case, before other image loader)
                enforce: 'pre',
                exclude: /node_modules/
            },

            // JSONs
            // webpack 4.0 = handle JSON natively
            // You may need to add type: "javascript/auto" when transforming JSON via loader to JS
            // Just using JSON without loader should still work

            // Texts (raw files)
            {
                test: /\.txt$/,
                use: 'raw-loader',
                exclude: /node_modules/
            },
        ]
    },

    plugins: [
        new WebpackMd5Hash(),
    ],

    // webpack 4.0 CommonsChunkPlugin replacement
    optimization: {
        splitChunks: {
            // By default, optimization.splitChunks only works for async chunks
            // We need to specify chunks: 'all' to scope in initial chunks
            chunks: 'all',
            cacheGroups: {
                // Create a commons chunk that includes all code shared between entry points
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "vendors"
                }
            }
        },
        occurrenceOrder: true,  // To keep filename consistent between different modes (for example building only)
        runtimeChunk: true,  // To create runtime chunks
    }
};