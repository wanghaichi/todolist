/**
 * Created by hardy on 17-1-6.
 */

var mysql = require('mysql');
var $conf = require('../conf/db').mysql;
var $sql = require('./userSQLMapping');

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
        connection.query($sql.queryByName, param.uname, function(err, result){
            console.log(param.uname);
            if(result && result.length !== 0){
                console.dir(result);
                result={
                    code: 2,
                    msg: '用户已存在'
                };
                jsonEcho(res, result);
                connection.release();
            }
            else{
                connection.query($sql.insert, [param.uname, param.upwd], function (err, result) {
                    if (result) {
                        result = {
                            code: 200,
                            msg: '添加成功'
                        };
                    }
                    jsonEcho(res, result);
                    connection.release();
                });
            }
        });

    })
};
var login = function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var param = req.body;
        connection.query($sql.checkLogin, [param.uname, param.upwd], function(err, result){
            if(result && result.length !== 0){
                // console.dir(result);
                global.uid = result[0].id;
                global.uname = result[0].username;
                result={
                    code: 200,
                    msg: '登陆成功'
                };
            }
            else{
                result={
                    code: 2,
                    msg: '登陆失败'
                };
            }
            jsonEcho(res, result);
            connection.release();
        });

    })
};

func = {
    add: add,
    login: login
};

module.exports = func;