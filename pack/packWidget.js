var path = require('path');
var fs = require('fs-extra');

var config = require('./config');
var tools = require('./tools');

/*
 *	处理组件内的html、css、js图片替换并返回js和css
 *	widget：组件名称	info: 页面信息	imgObj：该组件所有图片名称替换对象
 */

function packWidget(widget, info, imgObj){
	var widgetPath = path.join(config.views, info.name, widget);
	var dirPath = path.join(config.templates, info.name);

	var widgetHtml = fs.readFileSync(path.join(widgetPath, widget + '.html'), 'utf8');
	var widgetCss = fs.readFileSync(path.join(widgetPath, widget + '.less'), 'utf8');
	var widgetJs = fs.readFileSync(path.join(widgetPath, widget + '.js'), 'utf8');

	//组件html、css、js替换图片名称
	for( let imgName in imgObj ){
		let reg = new RegExp(imgName, 'g');
		let imgSrc = '/pages/image/' + imgObj[imgName];
		widgetHtml = widgetHtml.replace(reg, imgSrc);
		widgetCss = widgetCss.replace(reg, imgSrc);
		widgetJs = widgetJs.replace(reg, imgSrc);
	}

	//将组件的html打包至templates的页面下
	widgetHtml = tools.regReplace(widgetHtml);

	//查看templates下是否有页面文件夹
	fs.access(dirPath, function(err){
		if( err ) fs.mkdirSync(dirPath, 0777);
		fs.writeFileSync(path.join(dirPath, widget +'.html'), widgetHtml, 'utf8');
	});

	return {
		js: widgetJs,
		css: widgetCss,
	};
}

module.exports = packWidget;
