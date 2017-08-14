var config = require('./config');
var packImage = require('./packImage');
var packLayout = require('./packLayout');
var packPage = require('./packPage');

var fs = require('fs');
var path = require('path');
var glob = require('glob');

packLayout();
config.pagesIndex.forEach(filePath => {
	var info = pageInfo(filePath);
	var dirPath = path.join(config.views, info.name);
	//查看views下是否有页面文件夹
	fs.access(dirPath, function(err){
		if( err ) fs.mkdirSync(dirPath, 0777);
		//得到改页面的所有组件的js和css内容
		packImage(info);
	});
});

//获取页面组件等信息
function pageInfo(filePath){
	var arr = filePath.split('/').reverse();
	var pagePath = path.join(config.pages, arr[1], '*', '*.html');
	
	var widgets = ['page'];//每个页面必须要有个page组件
	var widgetArr = glob.sync(pagePath);
	widgetArr.forEach(_path => {
		var _arr = _path.split('/').reverse();
		if( widgets.indexOf(_arr[1]) == -1 )
		widgets.push(_arr[1]);
	});

	return {
		name: arr[1],		//页面名称
		file: arr[0],		//页面入口文件
		path: filePath,		//页面入口路径
		widgets: widgets	//页面所含有的组件名称
	};
}

