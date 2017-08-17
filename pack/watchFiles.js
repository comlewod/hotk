'use strict'

var path = require('path');
var chokidar = require('chokidar');
var glob = require('glob');

var config = require('./config');
var packGlobal = require('./packGlobal');
var packLayout = require('./packLayout');
var packImage = require('./packImage');
var tools = require('./tools');

function watchFile(layoutInfo){
	//监测layout文件
	chokidar.watch(path.join(config.views, '*.html'), {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', function(event, _path){
		console.log('layout 变动 ' + _path)
		watchLayout(_path);	
	});
	//检测页面入口文件及其相应组件
	var pageWatch = [
		path.join(config.views, '*', '*.html'),
		path.join(config.views, '*', '*', '*.*'),
		path.join(config.views, '*', '*', '*', '*.*')
	];
	chokidar.watch(pageWatch, {
		ignored: /(^|[\/\\])\../,
		ignoreInitial: true
	}).on('all', function(event, _path){
		console.log('页面文件改动 ' + _path);
		watchPage(_path);
	});
}

async function watchLayout(_path){
	await packLayout(_path);
}
async function watchPage(_path){
	let info = tools.pageInfo(_path);
	await packImage(info);
}

module.exports = watchFile;
