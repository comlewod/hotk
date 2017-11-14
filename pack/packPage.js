var path = require('path');
var fs = require('fs-extra');

var config = require('./config');
var tools = require('./tools');
var minJsCss = require('./minJsCss');

/*
 *	打包页面入口文件index.html
 */
async function packPage(info, content){
	var nameObj = await minJsCss(info, content);
	try{
		var indexContent = fs.readFileSync(info.path, 'utf8');
	} catch(e) {
		var indexContent = '';
	}
	indexContent = indexContent.replace(/page.js/g, '/pages/js/' + nameObj.js);
	indexContent = indexContent.replace(/page.css/g, '/pages/css/' + nameObj.css);

	for( let img in content.pageImg ){
		let reg = new RegExp(img, 'g');
		indexContent = indexContent.replace(reg, '/pages/image/' + content.pageImg[img]);
	}
	
	indexContent = tools.regReplace(indexContent);

	//每个页面的入口index.html
	try{
		fs.accessSync(path.join(config.templates, info.name));
	} catch(e){
		fs.mkdirSync(path.join(config.templates, info.name), 0777);
	}
	fs.writeFileSync(path.join(config.templates, info.name, info.file), indexContent, 'utf8');
} 

module.exports = packPage;
