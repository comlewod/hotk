var router = require('express').Router();
var ejs = require('ejs');

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
