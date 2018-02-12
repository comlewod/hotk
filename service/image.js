var path = require('path');
var fs = require('fs-extra');
var cryptoJs = require('crypto-js');

var ROOT = process.cwd();
var storagePath = path.join(ROOT, 'public', 'storage');

try {
	fs.accessSync(storagePath);
} catch(e) {
	fs.mkdirSync(storagePath);
}

image = {
	get: function(req, res, obj){
		var _path = path.join(storagePath, obj.folder, obj.file);
		try{
			fs.accessSync(_path);
		} catch(e){
		}
		res.sendFile();
	},
	save: function(folder, obj){
		try{
			fs.accessSync(path.join(storagePath, folder));
		} catch(e){
			fs.mkdirSync(path.join(storagePath, folder));
		}

		var _hash = cryptoJs.MD5(obj.buffer + obj.originalname).toString().slice(0, 6);
		let file_name =  _hash + '_' + obj.originalname;
		let _path = path.join(storagePath, folder, file_name);
		fs.writeFileSync(_path, obj.buffer);
		return 'storage/' + folder + '/' + file_name;
	},
};

module.exports = image;
