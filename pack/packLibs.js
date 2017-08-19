var path = require('path');
var fs = require('fs-extra');
var glob = require('glob');

var config = require('./config');
var minJsCss = require('./minJsCss');

async function packLibs(){
	try{
		fs.accessSync(config.output);
	} catch(e){
		fs.mkdirSync(config.output);
	}
	var content = {
		js: '',
		css: ''
	};
	var libJs = glob.sync(path.join(config.libs, 'js', '*.js'));
	var libCss = glob.sync(path.join(config.libs, 'css', '*.less'));
	for( let _path of libJs ){
		let con = fs.readFileSync(_path, 'utf8');
		content.js += con;
	}
	for( let _path of libCss ){
		let con = fs.readFileSync(_path, 'utf8');
		content.css += con;
	}
	var libs = await minJsCss({name: 'libs'}, content, 'libs');
	return libs;
}
module.exports = packLibs;
