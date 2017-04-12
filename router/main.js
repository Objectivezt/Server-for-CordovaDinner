/**
 * Created by Jack on 2017/4/10.
 */
var express = require('express');
var router = express.Router();
//省略/admin/user->  /user
router.get('/user',function (req,res,next) {
    res.send('main-User');
});
//顶部（注册登录按钮）
/*
* 主导航栏{logo，产品搜索，location}
* 促销信息
* 促销广告
* 食堂目录
*   商店目录
*     菜品目录
* 底部备案信息
* */
module.exports = router;