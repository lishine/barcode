module.exports = (env) => {
	const path = require('path')
	const webpack = require('webpack')
	const Dotenv = require('dotenv-webpack')

	const HtmlWebpackPlugin = require('html-webpack-plugin')
	const CleanWebpackPlugin = require('clean-webpack-plugin')

	const PUBLIC_DIR = path.resolve(__dirname, 'public')
	const BUILD_DIR = path.resolve(__dirname, 'dist')
	const APP_DIR = path.resolve(__dirname, 'src/client')
	const NODE_MODULES = path.resolve(__dirname, 'node_modules')

	const rules = [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			},
		},
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=100000',
		},
	]

	const config = {
		entry: path.resolve(APP_DIR, 'index.js'),
		output: {
			publicPath: '/',
			path: BUILD_DIR,
			filename: 'bundle.js',
		},
		module: {
			rules,
		},
		resolve: {
			modules: [APP_DIR, NODE_MODULES],
			extensions: ['.js', '.jsx'],
			alias: {
				img: path.resolve(__dirname, 'src/img'),
				Store: path.resolve(__dirname, 'src/Store'),
			},
		},
		plugins: [
			new Dotenv({
				path: path.resolve(__dirname, '.env'),
			}),
			new webpack.EnvironmentPlugin({
				NODE_ENV: env.development,
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(PUBLIC_DIR, 'index.html'),
				favicon: path.resolve(PUBLIC_DIR, 'favicon.ico'),
			}),
		],
	}

	if (env.production) {
		// config.plugins.push(
		// 	new webpack.optimize.UglifyJsPlugin({
		// 		compress: { warnings: false },
		// 	}),
		// 	new CleanWebpackPlugin([BUILD_DIR])
		// )
	} else {
		config.devServer = {
			historyApiFallback: true,
			port: 3000,
			open: false,
			proxy: {
				'/api': 'http://localhost:8080',
			},
		}
	}

	return config
}
