module.exports = env => {
	var path = require('path')
	var webpack = require('webpack')
	var Dotenv = require('dotenv-webpack')

	var HtmlWebpackPlugin = require('html-webpack-plugin')
	var CleanWebpackPlugin = require('clean-webpack-plugin')
	// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
	// var CompressionPlugin = require('compression-webpack-plugin')
	var WebpackMd5Hash = require('webpack-md5-hash')
	var MiniCssExtractPlugin = require('mini-css-extract-plugin')
	var Visualizer = require('webpack-visualizer-plugin')
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

	var PUBLIC_DIR = path.resolve(__dirname, 'public')
	var BUILD_DIR = path.resolve(__dirname, 'dist')
	var APP_DIR = path.resolve(__dirname, 'src/client')
	var NODE_MODULES = path.resolve(__dirname, 'node_modules')
	var TARGET = env.development ? 'development' : 'production'

	var outputFileName = 'app'
	var ending = TARGET === 'production' ? 'min.js' : 'js'

	console.log('TARGET', TARGET)

	var rules = [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			},
		},
		{
			test: /\.s?[c|a]ss$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				// 'clean-css-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
		{
			test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=100000',
		},
	]

	var config = {
		mode: TARGET,
		entry: { bundle: ['@babel/polyfill', path.resolve(APP_DIR, 'index.js')] },
		output: {
			publicPath: '/',
			path: BUILD_DIR,
			// filename: `${outputFileName}.[hash].${ending}`,
			filename: 'bundle.js',
		},
		module: {
			rules,
		},
		resolve: {
			modules: [APP_DIR, NODE_MODULES],
			extensions: ['.js', '.jsx'],
			// alias: {
			// 	styled: path.resolve(APP_DIR, 'styled'),
			// },
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'style.[contenthash].css',
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(TARGET),
			}),
			new Dotenv({
				path: path.resolve(__dirname, '.env'),
			}),
			// new webpack.EnvironmentPlugin({
			// 	NODE_ENV: TARGET,
			// }),
			new HtmlWebpackPlugin({
				title: 'Caching',
				hash: true,
				template: path.resolve(PUBLIC_DIR, 'index.html'),
				favicon: path.resolve(PUBLIC_DIR, 'favicon.ico'),
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({
				view: ['react-easy-state', 'view'],
				dispatch: ['store/configureStore', 'dispatch'],
				connect: ['utils/with-context', 'connect'],
				navigate: ['redux-saga-first-router', 'navigate'],
				toto: ['utils/utils', 'toto'],
				when: ['utils/utils', 'when'],
				sleep: ['utils/utils', 'sleep'],
				React: 'react',
				get: 'lodash/fp/get',
				map: ['utils/utils', 'map'],
				reduce: ['utils/utils', 'reduce'],
			}),
			new WebpackMd5Hash(),
		],
	}

	if (env.production) {
		config.plugins.push(
			new CleanWebpackPlugin([BUILD_DIR])
			// new Visualizer(),
			// new BundleAnalyzerPlugin()
		)
	} else {
		// config.devtool = 'inline-source-map'
		config.devServer = {
			hot: true,
			publicPath: '/',
			contentBase: BUILD_DIR,
			historyApiFallback: true,
			port: 3000,
			open: false,
			proxy: [
				{
					context: ['/auth', '/api', '/api1'],
					target: 'http://localhost:8080',
				},
			],
		}
	}

	return config
}
