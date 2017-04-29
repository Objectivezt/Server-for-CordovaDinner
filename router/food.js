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
// var servers = http.createServer(function(req, res) {
//     var params = url.parse(req.url, true);
//
//     if (params.pathname == '/ajax/ajaxtest') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var data1 = "[{name:'sb',age:20}]";
//         //res.write('hello, 异步请求数据获取成功！');
//         res.write(JSON.stringify(data1));
//         res.end();
//     } else if (params.pathname == '/ajax/getheader') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var header = [
//             {"headers": 1, "img": "images/wxts-01.jpg"},
//             {"headers": 2, "img": "images/wxts-03.jpg"},
//             {"headers": 3, "img": "images/wxts-04.jpg"}
//         ]
//
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(header) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(header));
//         }
//         res.end();
//     } else if (params.pathname == '/ajax/getBanner') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var data = [
//             {"id": 1, "img": "images/banner1.jpg"},
//             {"id": 2, "img": "images/banner2.jpg"}
//         ]
//
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(data) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(data));
//         }
//         res.end();
//     } else if (params.pathname == '/ajax/getHotGame') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var GetHGame = [
//             {"hot": "1", "img": "images/hot1.jpg"},
//             {"hot": "2", "img": "images/hot2.jpg"},
//             {"hot": "3", "img": "images/hot3.jpg"},
//             {"hot": "4", "img": "images/hot4.jpg"},
//             {"hot": "5", "img": "images/hot5.jpg"},
//             {"hot": "6", "img": "images/hot6.jpg"},
//             {"hot": "7", "img": "images/hot7.jpg"},
//             {"hot": "8", "img": "images/hot8.jpg"},
//             {"hot": "9", "img": "images/hot9.jpg"},
//             {"hot": "10", "img": "images/hot10.jpg"},
//             {"hot": "11", "img": "images/hot11.jpg"},
//             {"hot": "12", "img": "images/hot12.jpg"}
//         ]
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(GetHGame) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(GetHGame));
//         }
//         res.end();
//     } else if (params.pathname == '/ajax/getbannerbottom') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var bannerbottom = [
//             {"id": 1, "img": "images/bannerbottom1.jpg"},
//             {"id": 2, "img": "images/bannerbottom2.jpg"},
//             {"id": 3, "img": "images/bannerbottom3.jpg"}
//         ]
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(bannerbottom) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(bannerbottom));
//         }
//         res.end();
//     } else if (params.pathname == '/ajax/bannerbottomB8') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var bannerbottomB8 = [
//             {"id": "1", "img": "images/s1.jpg"},
//             {"id": "2", "img": "images/s2.jpg"},
//             {"id": "3", "img": "images/s3.jpg"},
//             {"id": "4", "img": "images/s4.jpg"},
//             {"id": "5", "img": "images/s5.jpg"},
//             {"id": "6", "img": "images/s6.jpg"},
//             {"id": "7", "img": "images/s7.jpg"},
//             {"id": "8", "img": "images/s8.gif"},
//             {"id": "9", "img": "images/index_left_top.jpg"},
//             {"id": "10", "img": "images/index_ad_left.jpg"}
//
//         ]
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(bannerbottomB8) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(bannerbottomB8));
//         }
//         res.end();
//     } else if (params.pathname == '/ajax/quickshop') {
//         res.writeHead(200, {
//             "Content-Type": "text/plain; charset=utf-8",
//             "Access-Control-Allow-Origin": "*"
//         });
//         var data = [
//             {"id": "1", "img": "images/quickshop_1.png"},
//             {"id": "2", "img": "images/quickshop_2.png"},
//             {"id": "3", "img": "images/quickshop_3.png"},
//             {"id": "4", "img": "images/quickshop_4.png"},
//             {"id": "5", "img": "images/quickshop_5.png"},
//             {"id": "6", "img": "images/quickshop_6.png"},
//             {"id": "7", "img": "images/ads_bt.jpg"}
//         ]
//         if (params.query && params.query.callback) {
//             var str = params.query.callback + '(' + JSON.stringify(data) + ')';
//             res.write(str);
//         } else {
//             res.write(JSON.stringify(data));
//         }
//         res.end();
//     }
// });

module.exports = router;