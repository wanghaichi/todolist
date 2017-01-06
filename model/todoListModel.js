/**
 * Created by hardy on 17-1-4.
 */
var mysql = require('mysql');
var $conf = require('../conf/db').mysql;
var $sql = require('./todoListSQLMapping');

//mysql pool
var pool = mysql.createPool({
    host: $conf.host,
    user: $conf.user,
    password: $conf.password,
    database: $conf.database
});

var jsonEcho = function (res, ret) {
    res.json(errorProcess(res, ret));
};
var errorProcess = function (res, ret) {
    if (typeof res === 'undefined') {
        return {code: '1', msg: '操作失败'};
    } else {
        return ret;
    }
};
var add = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.insert, [param.content, new Date().toDateString(), global.uid], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '添加成功'
                };
            }
            jsonEcho(res, result);
            connection.release();
        })
    })
};
var remove = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;
        connection.query($sql.remove, param.id, function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '删除成功'
                };
            }
            jsonEcho(res, result);
            connection.release();
        })
    })
};
var update = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;
        connection.query($sql.update, [param.content, param.id], function (err, result) {
            if (result) {
                result = {
                    code: 200,
                    msg: '修改成功'
                };
            }
            jsonEcho(res, result);
            connection.release();
        })
    })
};
var queryById = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.query || req.params;
        connection.query($sql.queryById, [param.id], function (err, result) {
            jsonEcho(res, result);
            connection.release();
        })
    })
};
var queryAll = function (req, res, next) {
    var arr, farr;
    pool.getConnection(function (err, connection) {
        connection.query($sql.queryAll, global.uid, function (err, result) {
            arr = errorProcess(res, result);
            console.dir(arr);
            console.dir(global.uid);
            connection.query($sql.queryAllFinished, global.uid, function (err, result) {
                farr = errorProcess(res, result);
                res.render('index', {title: "todoList", arr: arr, farr: farr});
            });
            connection.release();
        })
    });
};

var finished = function(req, res, next){
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.finished, param.id,function (err, result) {
            jsonEcho(res, result);
            connection.release();
        })
    });
};

func = {
    add: add,
    remove: remove,
    update: update,
    queryById: queryById,
    queryAll: queryAll,
    finished: finished
};

module.exports = func;