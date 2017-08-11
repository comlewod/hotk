var imagemin = require('imagemin');
var imageminJpg = require('imagemin-jpegtran');
var imageminPng = require('imagemin-optipng');
var imageminGif = require('imagemin-gifsicle');
var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');
var cryptoJs = require('crypto-js');

var config = require('./config');
var packWidget = require('./packWidget');

function packImage(info){
	//该页面的js和css
	var pageJs = '';
	var pageCss = '';

	//删除旧的图片
	var oldArr = glob.sync(path.join(config.publicPages, 'image', info.name + '*.+(jpeg|jpg|png|gif)'));
	oldArr.forEach(_path => {
		fs.removeSync(_path);
	});
	
	//page的图片，可共用到当前页面的其它组件（图片同名则以组件图片优先）
	var pageImg = {};
	info.widgets.forEach(widget => {
		//按组件来处理组件内的图片，并替换组件内js、css的图片名称
		var imgObj = {};
		var widgetPath = path.join(config.pages, info.name, widget);
		var imgArr = glob.sync(path.join(widgetPath, '*.+(jpeg|jpg|png|gif)'));
		//获取图片buffer
		imgArr.forEach(_path => {
			var imgContent = fs.readFileSync(_path);
			var imgInfo = path.parse(_path);
			var buffer = imagemin.buffer(imgContent, {
				plugins: [
					imageminJpg(),
					imageminPng({optimizationLevel: 2}),
					imageminGif()
				]
			});

			var prevName = info.name + '-' + widget + '-' + imgInfo.name + '-';
			var nextName = fileRename(imgInfo.dir + imgInfo.base) + fileRename(buffer);
			var fileName = prevName + nextName + imgInfo.ext;

			fs.writeFileSync(path.join(config.publicPages, 'image', fileName), buffer);
			imgObj[imgInfo.base] = fileName;
		});

		if( widget == 'page' ){
			pageImg = JSON.parse(JSON.stringify(imgObj));
		} else {
			Object.assign(imgObj, pageImg);
		}

		var widgetContent = packWidget(widget, info, imgObj);	

		pageJs += widgetContent.js;
		pageCss += widgetContent.css;
	});
	return {
		js: pageJs,
		css: pageCss,
		pageImg: pageImg
	}
}


function fileRename(str){
	if( str )
	return cryptoJs.MD5(str).toString().slice(0, 5);
}

module.exports = packImage;
