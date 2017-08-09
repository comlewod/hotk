var imagemin = require('imagemin');
var imageminJpg = require('imagemin-jpegtran');
var imageminPng = require('imagemin-optipng');
var imageminGif = require('imagemin-gifsicle');
var glob = require('glob');
var path = require('path');
var config = require('./config');
var fs = require('fs-extra');
var cryptoJs = require('crypto-js');

function packImage(info){
	//该页面的js和css
	var pageJs = '';
	var pageCss = '';

	removeOldImg();

	info.widgets.forEach(widget => {
		//按组件来处理组件内的图片，并替换组件内js、css的图片名称
		var imgObj = {};
		var widgetPath = path.join(config.views, info.name, widget);
		var imgArr = glob.sync(path.join(widgetPath, '*.+(jpeg|jpg|png|gif)'));
		//获取图片buffer
		imgArr.forEach( _path => {
			var imgContent = fs.readFileSync(_path);
			var imgInfo = path.parse(_path);
			var buffer = imagemin.buffer(imgContent, {
				plugins: [
					imageminJpg(),
					imageminPng({optimizationLevel: 2}),
					imageminGif()
				]
			});

			var prevName = fileRename(imgInfo.dir + imgInfo.base);
			var nextName = fileRename(buffer);
			var fileName = imgInfo.name + '-' + prevName + nextName + imgInfo.ext;
			fs.writeFileSync(path.join(config.publicPages, 'image', fileName), buffer);

			imgObj[imgInfo.base] = fileName;
		});
		
		//html替换图片名称
		var widgetHtml = fs.readFileSync(path.join(widgetPath, widget + '.html'), 'utf8');

		//js、css替换图片名称
		var widgetCss = fs.readFileSync(path.join(widgetPath, widget + '.less'), 'utf8');
		var widgetJs = fs.readFileSync(path.join(widgetPath, widget + '.js'), 'utf8');
		for( let imgName in imgObj ){
			var reg = new RegExp(imgName, 'g');
			widgetHtml = widgetHtml.replace(reg, imgObj[imgName]);
			widgetCss = widgetCss.replace(reg, imgObj[imgName]);
			widgetJs = widgetJs.replace(reg, imgObj[imgName]);
		}
		
		pageJs += widgetJs;
		pageCss += widgetCss;
		fs.writeFileSync(path.join(widgetPath, widget+'.html'), widgetHtml, 'utf8');
	});
}

//删除旧的图片
function removeOldImg(widget){
	var oldArr = glob.sync(path.join(config.publicPages, 'image', '*.+(jpeg|jpg|png|gif)'));
	oldArr.forEach(_path => {
		fs.removeSync(_path);
	});
}

function fileRename(str){
	if( str )
	return cryptoJs.MD5(str).toString().slice(0, 5);
}

function getJs(){
}

module.exports = packImage;
