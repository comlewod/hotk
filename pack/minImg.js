var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');
var imagemin = require('imagemin');
var imageminJpg = require('imagemin-jpegtran');
var imageminPng = require('imagemin-optipng');
var imageminGif = require('imagemin-gifsicle');

var tools = require('./tools');
var config = require('./config');

/*
 *	打包图片并返回打包图片名称
 */
async function minImg(info, imgArr){
	var imgObj = {};
	for( let _path of imgArr ){
		var imgContent = fs.readFileSync(_path);
		var imgInfo = path.parse(_path);

		//获取图片buffer
		var buffer = await imagemin.buffer(imgContent, {
			plugins: [
				imageminJpg(),
				imageminPng({optimizationLevel: 2}),
				imageminGif()
			]
		});
		var fileName = info.name + '-' + info.widget + '-' + imgInfo.name + '-' + tools.fileRename(buffer) + imgInfo.ext;

		fs.writeFileSync(path.join(config.publicPages, 'image', fileName), buffer);
		imgObj[imgInfo.base] = fileName;
	}
	return imgObj;
}

module.exports = minImg;
