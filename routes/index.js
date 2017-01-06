var express = require('express');
var router = express.Router();
var todoListModel = require('../model/todoListModel');
var user = require('../model/userModel');
/* GET home page. */
router.get('/', function (req, res, next) {
    if(typeof global.uid === 'undefined')
        res.redirect('/login');
    todoListModel.queryAll(req, res, next);
});
router.get('/index', function (req, res, next) {
    if(typeof global.uid === 'undefined')
        res.redirect('/login');
    todoListModel.queryAll(req, res, next);
});
router.post('/add', function (req, res, next) {
    todoListModel.add(req, res, next);
});
router.post('/finished', function (req, res, next) {
    todoListModel.finished(req, res, next);
});
router.get('/query', function (req, res, next) {
    todoListModel.queryById(req, res, next);
});
// router.get('/queryAll', function(req, res, next){
//   todoListModel.queryAll(req, res, next);
// });
router.get('/update', function (req, res, next) {
    todoListModel.update(req, res, next);
});
router.get('/remove', function (req, res, next) {
    todoListModel.remove(req, res, next);
});
router.get('/app/', function (req, res, next) {
    res.send("hello world");
});
router.get('/login', function(req, res, next){
   res.render('login');
});
router.post('/login', function (req, res, next) {
   user.login(req, res, next);
});
router.get('/register', function(req, res, next){
    res.render('register');
});
router.post('/register', function(req, res, next){
    user.add(req, res, next);
});
module.exports = router;
