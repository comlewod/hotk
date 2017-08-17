'use strict'

var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');

var config = require('./config');
var packImage = require('./packImage');
var packLayout = require('./packLayout');
var packPage = require('./packPage');
var tools = require('./tools');
var watchFiles = require('./watchFiles');

/*
 *	打包流程：
 *	1、获取所有页面
 *	2、一个页面的所有组件里的图片，打包并记录文件名
 *	3、替换自身组件里html、js、css的图片名称，并打包组件html模板
 *	4、获取页面所有组件的js和css内容，合并压缩，生成文件
 *	5、替换页面index.html的js、css文件名称引用，打包index.html模板
 */

(async function(){
	await processLayout();	

	for( let filePath of config.pagesIndex ){
		let info = tools.pageInfo(filePath);
		//得到改页面的所有组件的js和css内容
		await packImage(info);
	}
	watchFiles();
})();


async function processLayout(){
	try{
		fs.accessSync(config.templates);
	} catch(e) {
		fs.mkdirSync(config.templates);
	}
	var oldLayout = glob.sync(path.join(config.templates, '*.html'));
	oldLayout.forEach(_path => {
		fs.removeSync(_path);
	});
	for( let _path of config.layouts ){
		await packLayout(_path);
	}
}


