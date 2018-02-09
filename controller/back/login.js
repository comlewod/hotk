var router = require('express').Router();
var cryptoJs = require('crypto-js');

var image = require('../../service/image');
var adminCrud = require('../../database/crud/admin');

router.get('/', (req, res) => {
	res.render('back/index', {
		page: 'login',
	});
});


router.post('/register', (req, res) => {
	//先查询是否已存在相同名字用户
	adminCrud.query('admin', 'name="' + req.body.name + '"', (result) => {
		if( result.length ){
			res.json({
				code: 1, 
				msg: 'user existed'
			});
		} else {
			var obj = Object.assign({}, req.body);
			obj.salt = Math.random().toString(20).substr(2);
			obj.last_login = +new Date();
			//密码加盐
			obj.password = cryptoJs.MD5(obj.password + obj.salt).toString();
			adminCrud.insert('admin', obj, (result) => {
				res.json({
					code: 0,
					info: result,
					msg: 'success' 
				});
			});
		}
	});
});


router.post('/login', (req, res) => {
	adminCrud.query('admin', 'name="' + req.body.name + '"', (result) => {
		result = result[0];
		var now_pw = cryptoJs.MD5(req.body.password + result.salt).toString();
		
		if( now_pw == result.password ){
			res.json({
				code: 0,
				msg: 'login success'
			});
		} else {
			res.json({
				code: 1,
				msg: 'password error'
			});
		}
	});
});

module.exports = router;
