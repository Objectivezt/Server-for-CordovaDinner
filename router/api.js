/**
 * Created by Jack on 2017/4/10.
 */
var express = require('express');
var router = express.Router();
//省略/admin/user->  /user
router.get('/user',function (req,res,next) {
    res.send('api-User');
});
router.get('/register',function (req,res,next) {
    // res.send('register');
    res.render('register');
});
router.get('/login',function (req,res,next) {
    res.send('login');
});
router.get('/forget',function (req,res,next) {
    res.send('forget');
});

/*
*个人信息
*   用户姓名，
*   用户学号，
*   昵称，
*   工号，
*   联系方式，
*
* 修改密码
* */
router.get('/setting',function (req,res,next) {
    res.send('person-setting');
});
//支付
//取货单号
router.get('/pay',function (req,res,next) {
    res.send('pay');
});
/*
* 购物车
*    商品列表
*       菜品的价格
*       菜品的数量
*       菜品的图片
*       删除单个菜品
*       删除全部菜品（清空购物车）
*       结算支付 api /pay
*
* */
router.get('/shopping-car',function (req,res,next) {
    res.send('shoppingcar');
});
/*订单中心
*   成交订单列表
*       订单编号
*       订单列表
*   未成交列表
*
*  */
router.get('/payList',function (req,res,next) {
    res.send('payList')
})


//评论列表获取模块
router.get('/comment/get',function (req,res,next) {
    res.send('comment/get');
});

//评论提交模块
router.get('/comment/post',function (req,res,next) {
    res.send('comment/post');
});


//留言模块
router.get('/message/list',function (req,res,next) {
    res.send('message-list');
});
router.get('/message/ask',function (req,res,next) {
    res.send('message-ask');
});
router.get('/message/res',function (req,res,next) {
    res.send('message-res');
});

module.exports = router;




