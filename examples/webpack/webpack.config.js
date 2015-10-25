var webpack = require('webpack');

module.exports = {
    entry: './app/index',
    output: {
        path: __dirname + '/build/',
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: [__dirname + '/node_modules',__dirname + '/bower_components/riot-mui/src']
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        preLoaders: [
            { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
        ],
        loaders: [
            { test: /\.js|\.tag|\.es6$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.scss$/, loaders: ["style", "css", "sass"]}
        ]
    },
    devServer: {
        contentBase: './build/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    }
};