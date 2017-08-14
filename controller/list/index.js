var router = require('express').Router();
var ejs = require('ejs');

var adminCrud = require('../../database/crud/admin');

router.get('/', function(req, res){
	adminCrud.query(function(result){
		res.render('list/index', {
			result: result
		});
	});
});

module.exports = router;
