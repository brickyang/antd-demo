const path = require('path');
const webpack = require('webpack');
const assetsPlugin = require('assets-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

const postcssConfig = require('./postcss.config');

module.exports = {
	entry: './index.jsx',
	context: path.resolve(__dirname, '../src'),
	output: {
		filename: '[name].[hash].js',
		hashDigestLength: 7,
		path: path.resolve(__dirname, '../build'),
		publicPath:  'localhost:3000/build/'
	},
	resolve: {
		extensions: ['.js', '.jsx', 'css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
      {
				test: /\.css$/,
				use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
				exclude: /node_modules/
			},
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        include: path.resolve(__dirname, '../node_modules/antd/lib/')
      }
		]
	},
	plugins: [
		new assetsPlugin({
			filename: 'assets.json',
			path: 'build'
		}),
		new extractTextPlugin({
      filename: '[name].[hash].css',
      ignoreOrder: true
    }),
		new webpack.optimize.UglifyJsPlugin({
			test: /(\.jsx|\.js)$/,
			minimize: true,
		})
	],
}
