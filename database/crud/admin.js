var mysql = require('mysql');

var adminSql = require('../sql/admin');
var db = require('../../conf/db');

//创建连接池
var pool = mysql.createPool(db.mysql);

var admin = {
	//查询
	query: (table, filter, cb) => {
		pool.getConnection((err, connect) => {
			let sql = adminSql.retrieve(table);
			if( filter ){
				sql += ' WHERE ' + filter;
			}
			connect.query(sql, (err, results, fields) => {
				if( err ) throw err;
				cb && cb(results);
				//有最大链接数，不用时，释放连接，该连接返回连接池以备其他的进程使用
				connect.release();
			});
		});
	},
	//插入
	insert: (table, obj, cb) => {
		pool.getConnection((err, connect) => {
			if( err ) throw err;
			let keys = Object.keys(obj).join(', ');
			let values = [Object.values(obj)];
			let sql = "INSERT INTO " + table + "(" + keys + ") VALUES ?";
			connect.query(sql, [values], (err, results, fields) => {
				if( err ) throw err;
				cb && cb(results);
				connect.release();

				//获取最新列表
				/*
				let query_sql = adminSql.retrieve(table);
				connect.query(query_sql, (err, results, fields) => {
					if( err ) throw err;
					cb && cb(results);
					connect.release();
				});
				*/
			});
		});
	},
	//删除
	drop: (table, obj, cb) => {
		pool.getConnection((err, connect) => {
			if( err ) throw err;
			let sql = "DELETE FROM " + table + " WHERE id=" + obj.id;
			connect.query(sql, (err, results, fields) => {
				if( err ) throw err;
				cb && cb(results);
				connect.release();
			});
		});
	},
};

module.exports = admin;
