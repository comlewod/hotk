var router = require('express').Router();
var multer = require('multer');
var ejs = require('ejs');
var upload = multer();
var fs = require('fs-extra');

var image = require('../../service/image');

//var adminCrud = require('../../database/crud/admin');

router.get('/', function(req, res){
	/*
	adminCrud.query(function(result){
		res.render('index/index', {
			result: result
		});
	});
	*/
	res.render('index/index', {
		result: []
	});
});


module.exports = router;
