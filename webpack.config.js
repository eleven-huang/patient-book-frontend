const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		alias: {
			svelte: path.resolve('node_modules', 'svelte')
		},
		extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	module: {
		rules: [
			{
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						emitCss: true,
						hotReload: true
					}
				},
			},
			{
          test: /\.(png|jpg|gif)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192
              }
          }]
        },
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		})
	],
	devtool: prod ? false: 'source-map',

	devServer: {
      contentBase: path.join(__dirname, '../dist'),
      // compress: true,
      host: '0.0.0.0',
			//disableHostCheck: true,
      //hot:true,
      historyApiFallback:true,
      proxy: {
        '/api': {
                target: 'http://localhost:1338',
                pathRewrite: {'^/api' : ''},
                changeOrigin:true
         }
      },
      port: 3000
    },
};
