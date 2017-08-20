var fs = require('fs-extra');
var path = require('path');

var config = require('./config');


function makeDir(){
	try{
		fs.accessSync(config.templates);
	} catch(e) {
		fs.mkdirSync(config.templates);
	}
	try{
		fs.accessSync(config.publicPages);
	} catch(e){
		fs.mkdirSync(config.publicPages);
		fs.mkdirSync(path.join(config.publicPages, 'js'));
		fs.mkdirSync(path.join(config.publicPages, 'css'));
		fs.mkdirSync(path.join(config.publicPages, 'image'));
	}
	try{
		fs.accessSync(config.output);
	} catch(e){
		fs.mkdirSync(config.output);
	}
}

module.exports = makeDir;
