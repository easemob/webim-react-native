var webpack = require('webpack');

var config = [{
    entry: {
        // './sdk/dist/websdk-1.1.3': './sdk/index',
        './demo/javascript/dist/demo': './demo/javascript/src/entry',
        './webrtc/dist/webrtc-1.0.0': './webrtc/src/webrtc',
    },
    output: {
        path: './',
        publicPath: './',
        filename: '[name].js',
    },
    // devtool: '#eval-cheap-module-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.svg|woff|eot|ttf$/,
                loader: require.resolve('file-loader') + '?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        // new webpack.NoErrorsPlugin(),
        // production must be with `UglifyJsPlugin` or ie9 crash
        // faster your app better use
        // https://github.com/facebook/react/issues/7803
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
}, {
    entry: {
        './sdk/dist/websdk-1.1.3': './sdk/index',
    },
    output: {
        path: './',
        publicPath: './',
        filename: '[name].min.js',
        sourceMapFilename: '[file].map',
        library: 'easemob-websdk',
        libraryTarget: 'umd'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
    ,
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
            }
        ]
    }
    ,
    plugins: [
        // new webpack.NoErrorsPlugin(),
        // production must be with `UglifyJsPlugin` or ie9 crash
        // faster your app better use
        // https://github.com/facebook/react/issues/7803
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': '"production"'
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // })
    ],
}];

module.exports = config;
;

