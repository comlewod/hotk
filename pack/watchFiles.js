'use strict'

var path = require('path');
var chokidar = require('chokidar');
var glob = require('glob');
var fs = require('fs-extra');

var config = require('./config');
var packGlobal = require('./packGlobal');
var packLayout = require('./packLayout');
var packLibs = require('./packLibs');
var packImage = require('./packImage');
var tools = require('./tools');

var layouts = glob.sync(path.join(config.views, '*.html'));
var libsPath = glob.sync(path.join(config.libs, '*', '*.*'));

function watchFile(layoutInfo, libs){
	//监测libs文件
	chokidar.watch(libsPath, {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		console.log('libs 变动 ' + _path)
		libs = await packLibs();
		for( let _path of config.layouts ){
			let info = path.parse(_path);
			await packLayout(_path, libs);
		}
	});

	//监测layout文件
	chokidar.watch(layouts, {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		console.log('layout 变动 ' + _path)
		packLayout(_path, libs);	
	});

	//监测页面入口文件及其相应组件
	var pageWatch = [
		path.join(config.views, '*', '*.html'),			//页面入口文件
		path.join(config.views, '*', '*', '*.*'),		//组件内的html、css、js
		path.join(config.views, '*', '*', '*', '*.*')	//组件内的图片
	];
	chokidar.watch(pageWatch, {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		console.log('页面文件改动 ' + _path);
		await checkGlobal(_path, layoutInfo);	

		let info = tools.pageInfo(_path);
		await packImage(info);

	});
}

async function checkGlobal(_path, layoutInfo){
	var info = _path.split('/').reverse();
	//查看是否改动global组件
	if( info[2] == 'global' && info[3] == 'views'){
		for( let layout in layoutInfo ){
			if( layoutInfo[layout].indexOf(info[1]) > -1 ){
				//重新打包引用该global内组件的layout
				await packLayout(path.join(config.views, layout));	
			}
		}
	}
}

module.exports = watchFile;
