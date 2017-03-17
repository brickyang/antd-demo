const path = require('path');
const webpack = require('webpack');
const assetsPlugin = require('assets-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./index',
	],
	context: path.resolve(__dirname, '../src'),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../build'),
		publicPath: `http://localhost:8080/build/`,
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'react-hot-loader',
				exclude: /node_modules/
		  },
      {
				test: /\.jsx?$/,
				loader: 'babel-loader',
        query: { cacheDirectory: true },
				exclude: /node_modules/
		  },
      {
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: 'style-loader',
          use: 'css-loader',
				 }),
         exclude: /node_modules/,
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
			filename: '[name].css'
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
}
