var config = require('./config');
var packImage = require('./packImage');
var packLayout = require('./packLayout');
var packPage = require('./packPage');
var tools = require('./tools');

var fs = require('fs');
var path = require('path');
var glob = require('glob');

/*
 *	打包流程：
 *	1、获取所有页面
 *	2、一个页面的所有组件里的图片，打包并记录文件名
 *	3、替换自身组件里html、js、css的图片名称，并打包组件html模板
 *	4、获取页面所有组件的js和css内容，合并压缩，生成文件
 *	5、替换页面index.html的js、css文件名称引用，打包index.html模板
 */

packLayout();
config.pagesIndex.forEach(filePath => {
	var info = pageInfo(filePath);
	var dirPath = path.join(config.templates, info.name);
	//查看templates下是否有页面文件夹
	fs.access(dirPath, function(err){
		if( err ) fs.mkdirSync(dirPath, 0777);
		//得到改页面的所有组件的js和css内容
		packImage(info);
	});
});

//获取页面组件等信息
function pageInfo(filePath){
	var arr = filePath.split('/').reverse();
	var pagePath = path.join(config.views, arr[1], '*', '*.html');

	var widgets = ['page'];//每个页面必须要有个page组件
	console.log(config.widgets);
	/*
	var widgetArr = glob.sync(pagePath);
	widgetArr.forEach(_path => {
		var _arr = _path.split('/').reverse();
		if( widgets.indexOf(_arr[1]) == -1 )
		widgets.push(_arr[1]);
	});
	*/

	return {
		name: arr[1],		//页面名称
		file: arr[0],		//页面入口文件
		path: filePath,		//页面入口路径
		widgets: widgets	//页面所含有的组件名称
	};
}

