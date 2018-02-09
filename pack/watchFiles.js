'use strict'

//如果发现监控只修改了一次，后续监控无效的话，需要关闭所有监控进程（关闭bash），再重新开启进程
//或者是监控文件并不在同个目录下（传入数组参数时），导致只有监控一次，后续无效（可能是插件bug）

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

function watchFile(layoutInfo, libs){
	//监测libs文件
	chokidar.watch(path.join(config.libs, '*', '*.*'), {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		logPath('libs', _path)
		var new_libs = await packLibs();
		for( let _path of config.layouts ){
			let info = path.parse(_path);
			await packLayout(_path, new_libs);
		}
	});

	//监测layout文件
	chokidar.watch(layouts, {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		logPath('layout', _path)
		packLayout(_path, libs);	
	});
	
	//页面入口文件
	chokidar.watch(path.join(config.views, '*', '*.html'), {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		logPath('页面入口文件', _path);
		await checkGlobal(_path, layoutInfo);	

		let info = tools.pageInfo(_path);
		await packImage(info);
	});

	//组件内的html、css、js
	chokidar.watch(path.join(config.views, '*', '*', '*.*'), {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		logPath('组件文件', _path);
		var widgetInfo = path.parse(_path);
		var pageIndex = path.join(path.resolve(widgetInfo.dir, '..'), 'index.html');

		await checkGlobal(pageIndex, layoutInfo);	
		let info = tools.pageInfo(pageIndex);
		await packImage(info);
	});

	//组件内的图片
	chokidar.watch(path.join(config.views, '*', '*', '*', '*.*'), {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', async function(event, _path){
		logPath('组件图片', _path);
		var widgetInfo = path.parse(_path);
		var pageIndex = glob.sync(path.join(path.resolve(widgetInfo.dir, '..', '..'), '*.html'));

		await checkGlobal(pageIndex[0], layoutInfo);	
		let info = tools.pageInfo(pageIndex[0]);
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

function logPath(txt, dir){
	var relative = path.relative(config.root, dir);
	console.log(txt + '改动：' + relative);
}

module.exports = watchFile;
