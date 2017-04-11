/**
 * Created by Jack on 2017/4/10.
 */
var express = require('express');
var router = express.Router();
//省略/admin/user->  /user
router.get('/user',function (req,res,next) {
    res.send('api-User');
});


module.exports = router;