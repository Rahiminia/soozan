const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.bundle.js"
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:{loader:'babel-loader'}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:"index.html",
			inject: true,
			template: path.join(__dirname, "/src/index.html")
		})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
	}
}
