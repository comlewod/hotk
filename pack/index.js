var config = require('./config');
var packImage = require('./packImage');

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var uglifyJs = require('uglify-js');

var content = '';
config.pages.forEach(filePath => {
	var info = pageInfo(filePath);

	info.widgets.forEach(widget => {
		var file_js = path.join(config.views, info.name, widget, '*.js');
	});

	packImage(info);
	content += fs.readFileSync(filePath, {encoding: 'utf8'});
});

//获取页面组件等信息
function pageInfo(filePath){
	var arr = filePath.split('/').reverse();
	var pagePath = path.join(config.views, arr[1], '*', '*.html');
	
	var widgets = [];
	var widgetArr = glob.sync(pagePath);
	widgetArr.forEach(_path => {
		var _arr = _path.split('/').reverse();
		widgets.push(_arr[1]);
	});

	return {
		name: arr[1],		//页面名称
		file: arr[0],		//页面入口文件
		widgets: widgets	//页面所含有的组件名称
	};
}

