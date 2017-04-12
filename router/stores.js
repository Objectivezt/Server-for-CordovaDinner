/**
 * Created by Jack on 2017/4/11.
 */
var express = require('express');
var router = express.Router();

router.get('/user',function (req,res,next) {
    res.send('userLists')
});

module.exports = router;