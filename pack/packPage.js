var less = require('less');
var cleanCss = require('clean-css');
var uglifyJs = require('uglify-js');
var cryptoJs = require('crypto-js');
var glob = require('glob');
var path = require('path');
var fs = require('fs-extra');

var config = require('./config');
var tools = require('./tools');

function packPage(info, content){
	less.render(content.css).then(obj => {
		var pageCss = new cleanCss().minify(obj.css).styles;
		var pageJs = uglifyJs.minify(content.js).code;

		var jsName = info.name + '-' + tools.fileRename(pageJs) + '.js';
		var cssName = info.name + '-' + tools.fileRename(pageCss) + '.css';
		var oldJs = glob.sync(path.join(config.publicPages, 'js', info.name + '-*.js'));
		var oldCss = glob.sync(path.join(config.publicPages, 'css', info.name + '-*.css'));
		oldJs.forEach(_path => {
			fs.removeSync(_path);
		});
		oldCss.forEach(_path => {
			fs.removeSync(_path);
		});
		fs.writeFileSync(path.join(config.publicPages, 'js', jsName), pageJs, 'utf8');
		fs.writeFileSync(path.join(config.publicPages, 'css', cssName), pageCss, 'utf8');

		var indexContent = fs.readFileSync(info.path, 'utf8');
		indexContent = indexContent.replace(/page.js/g, '/pages/js/' + jsName);
		indexContent = indexContent.replace(/page.css/g, '/pages/css/' + cssName);
		var pageImg = content.pageImg;


		for( let img in pageImg ){
			let reg = new RegExp(img, 'g');
			indexContent = indexContent.replace(reg, '/pages/image/' + pageImg[img]);
		}
		
		indexContent = tools.widgetReg(indexContent);
		//每个页面的入口index.html
		fs.writeFileSync(path.join(config.templates, info.name, info.file), indexContent, 'utf8');
	});

} 

module.exports = packPage;
