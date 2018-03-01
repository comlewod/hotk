var router = require('express').Router();
var cryptoJs = require('crypto-js');

var image = require('../../service/image');
var adminCrud = require('../../database/crud/admin');

router.get('/', (req, res) => {
	if( req.session.view ) req.session.view++;
	else req.session.view = 1;
	//res.send('' +req.session.user);return;
	var login_user = '';
	if( req.session.user ){
		login_user = req.session.user;
		return res.redirect('/back');
	}
	res.render('back/index', {
		page: 'login',
		login_user: login_user,
		view: req.session.view
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
			//重新生成session_id
			req.session.regenerate(err => {
				if( err ){
					return res.json({code: 1, msg: 'login error'});
				} 
				req.session.user = req.body.name;
				res.json({
					code: 0,
					msg: 'login success'
				});
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
