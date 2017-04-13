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
router.get('/',function (req,res,next) {
    // 第二个参数是传递给模板引擎的数据
    res.render('grade');
});

module.exports = router;