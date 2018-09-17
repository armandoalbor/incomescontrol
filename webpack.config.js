var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const path = require('path');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

module.exports = [
  {
    entry: './index.js',
    devtool: 'eval-source-map',

		output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },

		target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
		},

		module: {
			rules: [
				{
          test: /\.js$/,
          loader: 'babel-loader'
				},
				{
					test: /\.json$/,
					loader: 'json-loader'
				}
			]
		},

    externals: nodeExternals(),
    plugins: productionPluginDefine,
  }
];
