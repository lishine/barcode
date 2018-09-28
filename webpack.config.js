module.exports = env => {
	var path = require('path')
	var webpack = require('webpack')
	var Dotenv = require('dotenv-webpack')

	var HtmlWebpackPlugin = require('html-webpack-plugin')
	var CleanWebpackPlugin = require('clean-webpack-plugin')
	// var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
	// var CompressionPlugin = require('compression-webpack-plugin')
	var Visualizer = require('webpack-visualizer-plugin')
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	// var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
	var MiniCssExtractPlugin = require('mini-css-extract-plugin')

	var PUBLIC_DIR = path.resolve(__dirname, 'public')
	var BUILD_DIR = path.resolve(__dirname, 'dist')
	var APP_DIR = path.resolve(__dirname, 'src/client')
	var NODE_MODULES = path.resolve(__dirname, 'node_modules')
	var TARGET = env.development ? 'development' : 'production'

	let outputFileName = 'app'
	outputFileName += TARGET === 'production' ? '.min.js' : '.js'
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
			test: /\.scss$/,
			loaders: [
				'style-loader',
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						config: {
							path: 'postcss.config.js',
						},
					},
				},
				'sass-loader',
			],
		},
		{
			test: /\.css$/,
			use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
			filename: outputFileName,
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
				filename: '[name].css',
				chunkFilename: '[id].css',
			}),
			new Dotenv({
				path: path.resolve(__dirname, '.env'),
			}),
			new webpack.EnvironmentPlugin({
				NODE_ENV: TARGET,
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(PUBLIC_DIR, 'index.html'),
				favicon: path.resolve(PUBLIC_DIR, 'favicon.ico'),
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.ProvidePlugin({
				dispatch: ['store/configureStore', 'dispatch'],
				connect: ['utils/with-context', 'connect'],
				navigate: ['redux-saga-first-router', 'navigate'],
				when: ['utils/utils', 'when'],
				sleep: ['utils/utils', 'sleep'],
				React: 'react',
				get: 'lodash/fp/get',
				map: 'lodash/fp/map',
				reduce: 'lodash/fp/reduce',
			}),
		],
	}

	if (env.production) {
		// config.optimization = {
		// 	minimizer: [
		// 		new UglifyJsPlugin({
		// 			cache: true,
		// 			parallel: true,
		// 		}),
		// 		new OptimizeCSSAssetsPlugin({}),
		// 	],
		// }
		config.plugins.push(
			// new webpack.optimize.AggressiveMergingPlugin(),
			// new CompressionPlugin({
			// 	filename: '[path].gz[query]',
			// 	algorithm: 'gzip',
			// 	test: /\.js$|\.min.js$|\.css$|\.html$/,
			// 	threshold: 10240,
			// 	minRatio: 0.8,
			// 	deleteOriginalAssets: true,
			// }),
			new CleanWebpackPlugin([BUILD_DIR]),
			new Visualizer(),
			new BundleAnalyzerPlugin()
		)
	} else {
		config.plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development'),
			})
		)
		config.devtool = 'inline-source-map'
		config.devServer = {
			hot: true,
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
