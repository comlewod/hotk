var mysql = require('mysql');

var adminSql = require('../sql/admin');
var db = require('../../conf/db');

//创建连接池
var pool = mysql.createPool(db.mysql);

var admin = {
	query: function(cb){
		pool.getConnection(function(err, connect){
			connect.query(adminSql.retrieve, function(err, results, fields){
				if( err ) throw err;
				cb && cb(results);
				//释放连接，该连接返回连接池以备其他的进程使用
				connect.release();
			});
		});
	}
};

module.exports = admin;
