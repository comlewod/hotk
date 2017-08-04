var router = require('express').Router();

var adminCrud = require('../../database/crud/admin');

router.get('/', function(req, res){
	adminCrud.query(function(result){
		res.render('index/index', {
			result: result
		});
	});
});

module.exports = router;
