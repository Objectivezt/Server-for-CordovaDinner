/**
 * Created by Jack on 2017/4/10.
 */
var express = require('express');
var router = express.Router();

//省略/admin/user->  /user
router.get('/user',function (req,res,next) {
    res.send('User');
});

//admin
router.get('/adminDetaillist',function (req,res,next) {
    // 第二个参数是传递给模板引擎的数据
    // res.render('adminhearder');
    res.render('adminDetaillist');
});
router.get('/adminComment',function (req,res,next) {
    res.render('adminComment');
});
router.get('/adminGreens',function (req,res,next) {
    res.render('adminGreens');
});
router.get('/adminGreens/adminAdd',function (req,res,next) {

    res.render('adminAdd');
});

router.get('/test',function (req,res,next) {
    // 第二个参数是传递给模板引擎的数据
    res.render('test');
});

module.exports = router;