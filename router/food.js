/**
 * Created by Jack on 2017/4/11.
 */
var express = require('express');
var router = express.Router();
/*
* 菜品名称
* 菜品货号
* 菜品分类
* 菜品图片
* 价格{ 线上价格，线下价格}
* 菜品参数{主要菜品配料}
* 购买数量（份数）
* */
router.get('/food/detail',function (req,res,next) {
    res.send('food/detail');
});
module.exports = router;