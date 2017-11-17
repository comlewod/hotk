var mysql = require('mysql');

var adminSql = require('../sql/admin');
var db = require('../../conf/db');

//创建连接池
var pool = mysql.createPool(db.mysql);

var admin = {
	query: (table, cb) => {
		pool.getConnection((err, connect) => {
			let sql = adminSql.retrieve(table);
			connect.query(sql, (err, results, fields) => {
				if( err ) throw err;
				cb && cb(results);
				//有最大链接数，不用时，释放连接，该连接返回连接池以备其他的进程使用
				connect.release();
			});
		});
	},
	insert: (table, obj, cb) => {
		pool.getConnection((err, connect) => {
			if( err ) throw err;
			let keys = Object.keys(obj).join(', ');
			let values = [Object.values(obj)];
			let sql = "INSERT INTO banner (" + keys + ") VALUES ?";
			connect.query(sql, [values], (err, results, fields) => {
				if( err ) throw err;
				cb(results);
			});
		});
	},
};

module.exports = admin;
