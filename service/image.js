var path = require('path');
var fs = require('fs-extra');

var ROOT = process.cwd();
var storageImg = path.join(ROOT, 'storage');

image = {
	get: function(req, res, obj){
		var _path = path.join(storageImg, obj.folder, obj.file);
		try{
			fs.accessSync(_path);
		} catch(e){
		}
		res.sendFile();
	},
	save: function(folder, obj){
		try{
			fs.accessSync(path.join(storageImg, folder));
		} catch(e){
			fs.mkdirSync(path.join(storageImg, folder));
		}
		var _path = path.join(storageImg, folder, obj.originalname);
		fs.writeFileSync(_path, obj.buffer);
	},
};

module.exports = image;
