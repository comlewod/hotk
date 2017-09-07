var router = require('express').Router();
var fs = require('fs-extra');

var image = require('../service/image');

router.get('/:folder/:file', function(req, res){
	var obj = {
		folder: req.params.folder,
		file: req.params.file
	};
	image.get(req, res, obj);
});

module.exports = router;
