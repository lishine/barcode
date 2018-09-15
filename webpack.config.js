module.exports = (env) => {
	const path = require('path')
	const webpack = require('webpack')
	const Dotenv = require('dotenv-webpack')

	const HtmlWebpackPlugin = require('html-webpack-plugin')
	const CleanWebpackPlugin = require('clean-webpack-plugin')
	const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
	const CompressionPlugin = require('compression-webpack-plugin')
	const Visualizer = require('webpack-visualizer-plugin')
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
	const MiniCssExtractPlugin = require('mini-css-extract-plugin')

	const PUBLIC_DIR = path.resolve(__dirname, 'public')
	const BUILD_DIR = path.resolve(__dirname, 'dist')
	const APP_DIR = path.resolve(__dirname, 'src/client')
	const NODE_MODULES = path.resolve(__dirname, 'node_modules')
	const TARGET = env.development ? 'development' : 'production'

	let outputFileName = 'app'
	outputFileName += TARGET === 'production' ? '.min.js' : '.js'
	console.log('TARGET', TARGET)

	const rules = [
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

	const config = {
		mode: TARGET,
		entry: path.resolve(APP_DIR, 'index.js'),
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
			alias: {
				styled: path.resolve(APP_DIR, 'styled'),
			},
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
			new CleanWebpackPlugin([BUILD_DIR])
			// new Visualizer(),
			// new BundleAnalyzerPlugin()
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
			proxy: {
				'/api': 'http://localhost:8080',
			},
		}
	}

	return config
}
