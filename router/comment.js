/**
 * Created by Jack on 2017/4/11.
 */
var express = require('express');
var router = express.Router();

router.get('comment',function (req,res,next) {
    res.send('comment');
});
router.get('comment/delete',function (req,res,next) {
    res.send('comment/delete');
});
module.exports = router;

