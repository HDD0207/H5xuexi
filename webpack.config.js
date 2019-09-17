//请求Node.js提供的path模块
//path有一个方法：resolve(参数1，参数2)
//参数1：__dirname表示当前目录的路径
//参数2：需要追加的目录名，不需要写/，resolve方法会帮我们自动追加/
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV =process.env.WEBPACK_ENV || 'dev';

var config = {
	entry:{
		'common':[
			'.src/page/common/index.js',
			'index':'./src/page/index/index.js',
			'user-login':'./src/page/user-login/index.js'

		]
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/dist',
		filename:'js/[name].js'
	},
	externals:{
		'jquery' : 'window.jQuery'
	},
	optimizawion:{
		splitChunks:{
			//缓存组
			cachceGroups:{
				//commons:表示公共的模块
				commons:{
					//即会生成独立通用模块base.js文件（位置以output为准）
					name:'base',
					chunks:'initial',
					//最小2个文件有公共内容才提取
					minChunks:2,
					minSize:0
				}
			}
		}
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				// loader:"style-loader!css-loader",
				loader:ExtractTextPlugin.extract({
					fallback:"style-loader",
					use:"css-loader"
				})
			}
		]
	},
	plugin:[
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin({
			template:'./src/view/index.html',
			filename:'view/index.html',
			inject:true,
			hash:true,
			chunks:['common','index']
		})
	]
}

if ('dev'=== WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;