
var mysql = require('mysql');
var http = require('http');
var url = require('url');
var query = require('querystring');
//链接centos 数据库
// var connection = mysql.createConnection({
//     host:'120.24.244.81',
//     user:'root',
//     password:'ecjtuoybm',
//     port:'3306',
//     database:'nodefordinner'
// });
//localhost
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'666996',
    port:'3306',
    database:'nodefordinner'
});

var connectServer = function () {
                        var connection = mysql.createConnection({
                            host:'120.24.244.81',
                            user:'root',
                            password:'ecjtuoybm',
                            port:'3306',
                            database:'nodefordinner'
                        });
                        return connection;
                    },
    selectUser    = function (connection,username,callback) {
                        connection.query('select paasword from zt_user username="'+username+'"',function (err,results,field) {
                            if(err) throw err;
                            callback(results);
                        });
                    },
    insertUser   = function (connection,username,stuid,classid,password, callback) {
        connection.query('insert into zt_user value(?,?,?,?)', [username,stuid,classid,password],function (err,result) {
            if(err){
                console.log("error" + err.message);
                return err;
            }
            callback(err);
        });
    };
exports.connect = connectServer;
exports.selectUser = selectUser;
exports.insertUser = insertUser;
//创建一个connection
connection.connect(function (err) {
    if(err){
        console.log(err);
        return
    }
    console.log('connection suceesful');
});
//测试执行sql语句
// SELECT * from  ecjtu_user where username = "jack"
//'SELECT count(*) from  ecjtu_user where username = "ouyang"
connection.query('SELECT * FROM  zt_shop where sf_id = "1"',function (err, row, fields) {
    if(err){
        console.log(err);
        return
    }
    // console.log(row);
});
//人工迭代数据
var insertShop = function(req,res,snickname,simage,sdecript,sfid){
    connection.query('insert into zt_shop(s_nickname,s_image,s_description,sf_id) values("'+snickname+'","'+simage+'","'+sdecript+'","'+sfid+'")',function (err,rows,fields) {
        if(err){
            console.log(err);
            return;
        }
    })
};
var shopContaniner = ['汤粉','烧烤','腊肉','炸鸡','花荤','猪肉','蔬菜','米饭'];
var insertShopFn =  function () {
    for(var i = 1; i<=4; i++){
        for(var j = 1; j<=8; j++){
            temp = j + 8;
            insertShop(1,1,'北区'+i+'食堂的'+shopContaniner[j-1]+'店铺','img/shop'+temp+'.jpg','北区'+i+'食堂的'+shopContaniner[j-1]+'店铺',i+4);
        }
    }
};
// insertShopFn();
var insertRegister = function(req,res,username,stuid,classid,password){
                            //zt_user {  uid username stuid classid grade permission account password umark}
                            connection.query('insert into zt_user (username,stuid,classid,password) values("'+username+'","'+stuid+'","'+classid+'","'+password+'")',function (err,rows,fields) {
                                if(err){
                                    console.log(err);
                                    return;
                                }
                                res.end(JSON.stringify(rows));
                                res.end(rows.join);
                            });
                     },
    checkRegisterStuid = function (req,res,Stuid) {
                                connection.query('SELECT * from  zt_user where stuid = "'+Stuid+'"',function (err, row, fields) {
                                    if(err){
                                        console.log(err);
                                        return
                                    }
                                    var registerError = {'registerStatus':'error'},
                                        registerBingo = {'registerStatus':'bingo'};
                                    if(row.length >= 1){
                                        res.end(JSON.stringify(registerError));
                                    }else{
                                        insertRegister(req,res,username,stuid,classid,password);
                                        res.end(JSON.stringify(registerBingo));
                                    }
                                })
                         },
    checkLogin = function (res,req,Stuid,password) {
                    connection.query('SELECT * from  zt_user where stuid = "'+Stuid+'" and password = "'+password+'"',function (err,row,field) {
                        if(err){
                            console.log(err);
                            return
                        };
                        console.log(row);
                        console.log(row.length);
                        console.log(row[0]);
                        if(row.length == 1){
                            var loginBingo = {'loginStatus':'bingo',
                                'uid':row[0].uid,
                                'username': row[0].username,
                                'stuid': row[0].stuid,
                                'classid': row[0].classid,
                                'grade': row[0].grade,
                                'permission': row[0].permission
                            };
                            res.end(JSON.stringify(loginBingo));
                        }else{
                            var loginError = {'loginStatus':'error'}
                            res.end(JSON.stringify(loginError));
                        }
                    });
                 },
    // checkLogin(1,1,20132110010309,31231231231);
    checkAdminLogin = function (res,req,Stuid,password) {
        connection.query('SELECT * from  zt_user where stuid = "'+Stuid+'" and password = "'+password+'" and permission= "2"',function (err,row,field) {
            if(err){
                console.log(err);
                return
            }
            console.log(row);
            console.log(row.length);
            console.log(row[0]);
            if(row.length == 1){
                var loginBingo = {'loginStatus':'bingo',
                    'uid':row[0].uid,
                    'username': row[0].username,
                    'stuid': row[0].stuid,
                    'classid': row[0].classid,
                    'grade': row[0].grade,
                    'permission': row[0].permission
                };
                res.end(JSON.stringify(loginBingo));
            }else{
                var loginError = {'loginStatus':'error'};
                res.end(JSON.stringify(loginError));
            }
        });
    },
    selectShopData = function (res,shopPage) {
        connection.query('SELECT * FROM  zt_shop where sf_id = "'+shopPage+'"',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            console.log(rows);
            res.end(JSON.stringify(rows));
            // res.end(rows.join);
        })
    },insertBuyData = function (res,otime,gf_id,uid,getcode) {
        // oprice,uid,gid,
        connection.query('insert into zt_detail (order_time,dshop,dremake,getcode) values("'+otime+'","'+gf_id+'","'+uid+'","'+getcode+'")',function (err,rows) {
            if(err){
                console.log(err);
                return
            }
            // console.log(rows);
            // res.end(JSON.stringify(rows));
        });
    },selectdid = function (res) {
        var did = 0;
        connection.query('select * from zt_detail',function (err,rows) {
            if(err){
                console.log(err);
                return
            }
            did = rows[rows.length-1].did;
            console.log(did);
            return did;
        });
    },insertBuyDetail = function (res,detailid,greensid,oprice) {
        connection.query('insert into zt_odetail (detail_id,greens_id,oprice) values("'+detailid+'","'+greensid+'","'+oprice+'")',function (err,rows) {
          if (err) {
              console.log(err);
              return
          }
          console.log(rows);
          // res.end(JSON.stringify(rows));
      })
    },insertComment = function (res,ccomment,cgrade,uid,gid,ctime) {
        connection.query('insert into zt_comment (ccomment,uid,greens_id,cgrade,ctime) values("'+ccomment+'","'+uid+'","'+gid+'","'+cgrade+'","'+ctime+'")',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            res.end(JSON.stringify(rows));
        })
    },selectdetails = function (res) {
        connection.query('SELECT * FROM zt_odetail,zt_detail WHERE zt_odetail.detail_id = zt_detail.did;',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            console.log(rows);
        });
    },
    // ---table1指的是第一张表，table2指的是第二张表，table3指的是第三张表，
    // select  a.uid,a.uname,a.upsw,a.urealname,a.utel,a.remark,b.rname,b.rremark,c.deptname,c.deptremark from table1 a,table2 b, table3 c where a.sems_role_rid=b.rid and a.udeptid=c.deptid

    selectComment = function (res,uid) {
        connection.query('SELECT * FROM zt_comment,zt_user,zt_greens,zt_shop WHERE zt_comment.uid = zt_user.uid and zt_comment.greens_id = zt_greens.gid and zt_shop.sid = zt_greens.gf_id  and zt_user.uid = "'+uid+'"; ',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            console.log(rows);
            res.end(JSON.stringify(rows));
        });
    },
    selectCommentAdmin = function (res,classid) {
        connection.query('SELECT * FROM zt_comment,zt_user,zt_greens,zt_shop WHERE zt_comment.uid = zt_user.uid and zt_comment.greens_id = zt_greens.gid and zt_shop.sid = zt_greens.gf_id  and zt_greens.gid = "'+classid+'" ',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            console.log(rows);
            res.end(JSON.stringify(rows));
        });
    },


    // selectComment(1);
    selectdetaillist = function (res,uid) {
        connection.query('SELECT * FROM zt_odetail,zt_detail,zt_user,zt_greens WHERE  zt_greens.gid = zt_odetail.greens_id  and  zt_odetail.detail_id = zt_detail.did  and zt_detail.dremake = zt_user.uid  and  zt_user.uid ="'+uid+'"',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            console.log(rows.length);
            res.end(JSON.stringify(rows));
        })
    },

    chengeGoodsStautes = function (res,gid) {
        connection.query('update zt_greens set zt_greens.remark = "false" where gid = "'+gid+'"',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            // console.log(rows.length);
            res.end(JSON.stringify(rows));
        })
    },
    selectdetailadmin = function (res,classid) {
        connection.query('SELECT did,odid,order_time,getcode,username   FROM zt_odetail,zt_detail,zt_user   WHERE  zt_detail.dremake = zt_user.uid and zt_odetail.detail_id = zt_detail.did  and  zt_detail.dshop ="'+classid+'"',function (err,rows) {
            if (err) {
                console.log(err);
                return
            }
            console.log(rows.length);
            res.end(JSON.stringify(rows));
        })
    },

    randomWord = function(randomFlag, min, max){
        /*
         ** randomWord 产生任意长度随机字母数字组合
         ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
         ** xuanfeng 2014-08-28
         */
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    },insertGoods = function(res,goodsname,goodsprice,goodsdescription,goodsStore){
        //zt_user {  uid username stuid classid grade permission account password umark}
        connection.query('insert into zt_greens (g_nickname,g_desciption,price,gf_id) values("'+goodsname+'","'+goodsprice+'","'+goodsdescription+'","'+goodsStore+'")',function (err,rows,fields) {
            if(err){
                console.log(err);
                return;
            }
            res.end(JSON.stringify(rows));
        });
    }
    // console.log(randomWord(false,6));
// chengeGoodsStautes();
    // selectdetails(1);
    // insertBuyData(1,2,3,4,5,6);
    // insertBuyDetail(1,6,3,4);


var userApi = http.createServer(function (req, res) {
    var url_info = require('url').parse(req.url,true);
    if(url_info.pathname === '/insertUserinfo'){
        //接收前端发送的所有请求数据
        var registerData = '',
           registerObj = {},
           username = '',
           stuid = '',
           classid = '',
           password = '';
        res.writeHead(200,{
           "Content-Type": "text/plain; charset=utf-8",
           "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
           registerData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
           console.log('用户注册数据接收完毕');
           //转化为JSON对象
           registerObj = JSON.parse(registerData);
           console.log(registerObj);
           // console.log([url,ql]);
           username = registerObj.Username;
           stuid = registerObj.Stuid;
           classid = registerObj.Classid;
           password  = registerObj.Pwd;
           checkRegisterStuid(req,res,stuid);
        });
    }else if(url_info.pathname === '/selectUserinfo'){
        //接收前端发送的所有请求数据
        var loginData = '',
            loginObj = {},
            loginStuid = '',
            loginPassword = '';

        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            loginData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('用户登录数据接收完毕');
            //转化为JSON对象
            loginObj = JSON.parse(loginData);
            console.log(loginObj);
            loginStuid = loginObj.Stuid;
            loginPassword  = loginObj.Pwd;
            // checkLogin(res,req,loginStuid,loginPassword);

            if(loginObj.Auth){
                checkAdminLogin(res,req,loginStuid,loginPassword);
            }else{
                checkLogin(res,req,loginStuid,loginPassword);
            }
        });
    }
});




var dinnerApi = http.createServer(function (req,res) {
    var url_info  = require('url').parse(req.url, true);
    if(url_info.pathname === '/greensData'){
        var greensPageData = '',
            greensPageObj = {},
            greensPage = '';
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensPageData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('用户greens数据接收完毕');
            //转化为JSON对象
            greensPageObj = JSON.parse(greensPageData);
            console.log(greensPageObj);
            greensPage = greensPageObj.ParamId;
            // selectShopData(res,shopPage);
            connection.query('SELECT * FROM  zt_greens where gf_id="'+greensPage+'"',function (err,rows,fields) {
                if(err){
                    console.log(err);
                    return
                }
                res.end(JSON.stringify(rows));
                res.end(rows.join);
            })
        });
    }
    else if(url_info.pathname === '/greensDataIndex'){
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        connection.query('SELECT * FROM  zt_greens  ',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            res.end(JSON.stringify(rows));
            res.end(rows.join);
        })
    }
    else if(url_info.pathname === '/insertGoods'){
        //接收前端发送的所有请求数据
        var insertGoodsData = '',
            insertGoodsObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            insertGoodsData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('餐厅管理插入数据接收完毕');
            //转化为JSON对象
            insertGoodsObj = JSON.parse(insertGoodsData);
            console.log(insertGoodsObj);
            insertGoods(res,insertGoodsObj.goodsname,insertGoodsObj.goodsprice,insertGoodsObj.goodsdescription,insertGoodsObj.goodsStore);
        });
    }
    else if(url_info.pathname === '/greensDetailsData'){
        var greensDetailData = '',
            greensDetailObj = {},
            greensDetailid = '';
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensDetailData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('用户greens数据接收完毕');
            //转化为JSON对象
            greensDetailObj = JSON.parse(greensDetailData);
            console.log(greensDetailObj);
            greensDetailid = greensDetailObj.ParamId;
            // selectShopData(res,shopPage);
            connection.query('SELECT * FROM  zt_greens where gid="'+greensDetailid+'"',function (err,rows,fields) {
                if(err){
                    console.log(err);
                    return
                }
                res.end(JSON.stringify(rows));
                res.end(rows.join);
            })
        });
    }
    else if(url_info.pathname === '/greensDetailsName'){
        var greensDetailsName = '',
            greensDetailNameObj = {};
            greensDetailid = '';

        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensDetailsName += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('搜索数据接收完毕');
            //转化为JSON对象
            greensDetailNameObj = JSON.parse(greensDetailsName);
            console.log(greensDetailNameObj);
            greensDetailid = greensDetailNameObj.ParamId;
            // selectShopData(res,shopPage);
            console.log(greensDetailid);
            connection.query('SELECT * FROM  zt_greens where g_nickname = "'+greensDetailid+'"',function (err,rows,fields) {
                if(err){
                    console.log(err);
                    return
                }
                console.log(rows);
                console.log(rows.length);
                if(rows.length>0){
                    res.end(JSON.stringify(rows[0]));
                    res.end(rows.join);
                }else{
                    res.end(JSON.stringify(rows[0]));
                }
            })
        });
    }
    else if(url_info.pathname === '/shopData'){
        var shopPageData = '',
            shopPageObj = {},
            shopPage = '';
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            shopPageData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('店铺数据接收完毕');
            //转化为JSON对象
            shopPageObj = JSON.parse(shopPageData);
            console.log(shopPageObj);
            shopPage = shopPageObj.ParamId;
            selectShopData(res,shopPage);
        });
    }
    else if(url_info.pathname === '/greensbuy'){
        var greenBuyData = '',
            greenBuyObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greenBuyData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('购买数据接收完毕');
            // var tempdid = 0;
            //转化为JSON对象
            var greenBuyObj = JSON.parse(greenBuyData);
            console.log(greenBuyObj);
            // console.log(randomWord(false,6));
            var getcodetemp =  greenBuyObj.gf_id + randomWord(false,5);
            console.log('123----------'+getcodetemp);
            console.log(greenBuyObj.gf_id);
            insertBuyData(res,greenBuyObj.buydate,greenBuyObj.gf_id,greenBuyObj.uid,getcodetemp);
            connection.query('select * from zt_detail',function (err,rows,fields) {
                var didObj = {
                    'didObjnum' : rows[rows.length-1].did,
                    'getcodetemp': getcodetemp
                };
                if(err){
                    console.log(err);
                    return
                }
                res.end(JSON.stringify(didObj));
            });
        });
    }
    else if(url_info.pathname === '/greensbuydata'){
        var greensbuydataData = '',
            greensbuydataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensbuydataData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('购买did数据接收完毕');
            var tempdid = 0;
            //转化为JSON对象
            greensbuydataObj = JSON.parse(greensbuydataData);
            // console.log(greensbuydataData);
            console.log(greensbuydataObj);
            insertBuyDetail(res,greensbuydataObj.buydid,greensbuydataObj.oprice,greensbuydataObj.gid);

        });
    }
    else if(url_info.pathname === '/greensStatus'){
        var greensChangeData = '',
            greensChangeObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensChangeData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('购买did数据接收完毕');
            //转化为JSON对象
            greensChangeObj = JSON.parse(greensChangeData);
            // console.log(greensbuydataData);
            console.log(greensChangeObj);
            chengeGoodsStautes(res,greensChangeObj.goodsid);
        });
    }
    else if(url_info.pathname === '/messData'){
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        connection.query('SELECT * FROM  zt_mess ',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            res.end(JSON.stringify(rows));
            res.end(rows.join);
        })
    } else if(url_info.pathname === '/comment'){
        var commentData = '',
            commentdataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            commentData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('个人数据接收完毕');
            //转化为JSON对象
            commentdataObj = JSON.parse(commentData);
            console.log(commentdataObj);

            selectComment(res,commentdataObj.uid);
        });
    }
    else if(url_info.pathname === '/commentAdmin'){
        var commentData = '',
            commentdataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            commentData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('admin个人数据接收完毕');
            //转化为JSON对象
            commentdataObj = JSON.parse(commentData);
            console.log(commentdataObj);
            selectCommentAdmin(res,commentdataObj.classid);
        });
    }
    else if(url_info.pathname === '/detailAdmin'){
        var detailData = '',
            detaildataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            detailData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('detailadmin个人数据接收完毕');
            //转化为JSON对象
            detaildataObj = JSON.parse(detailData);
            console.log(detaildataObj);
            selectdetailadmin(res,detaildataObj.classid);
        });
    }

    else if(url_info.pathname === '/evaluate'){
        var ccommentData = '',
            ccommentdataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            ccommentData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('个人数据接收完毕');
            //转化为JSON对象
            ccommentdataObj = JSON.parse(ccommentData);
            insertComment(res,ccommentdataObj.ccomment,ccommentdataObj.cgrade,ccommentdataObj.uid,ccommentdataObj.gid,ccommentdataObj.ctime)
        });
    }
    else if(url_info.pathname === '/getDetaillist'){
        var detaillistData = '',
            detaillistDataObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            detaillistData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('评价数据接收完毕');
            detaillistDataObj = JSON.parse(detaillistData);
            console.log(detaillistDataObj.userid);
            selectdetaillist(res,detaillistDataObj.userid);
        });
    }
    else if(url_info.pathname === '/greensAdminData'){
        var greensData = '',
            greensObj = {};
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //监听,前端有数据,有就调用
        req.addListener('data',function (data) {
            greensData += data;
        });
        //前端数据接收完毕
        req.addListener('end',function () {
            console.log('用户greensadmin数据接收完毕');
            //转化为JSON对象
            greensObj = JSON.parse(greensData);
            console.log(greensObj);
            connection.query('SELECT * FROM  zt_greens where gf_id="'+greensObj.shopid+'"',function (err,rows,fields) {
                if(err){
                    console.log(err);
                    return
                }
                res.end(JSON.stringify(rows));
                res.end(rows.join);
            })
        })
    }




    // else if(url_info.pathname === '/setting'){
    //     res.writeHead(200,{
    //         "Content-Type": "text/plain; charset=utf-8",
    //         "Access-Control-Allow-Origin": "*"
    //     });
    //     //SELECT * FROM  zt_user where uid ="'+UserId+'"
    //     connection.query('SELECT * FROM  zt_user where uid ="10001"',function (err,rows,fields) {
    //         if(err){
    //             console.log(err);
    //             return
    //         }
    //         console.log(rows);
    //         res.end(JSON.stringify(rows));
    //         res.end(rows.join);
    //     })
    // }
    else{
        req.pipe(res);
    }
});
dinnerApi.listen(8198,'localhost',function () {
    console.log('8198');
});
userApi.listen(8197,'localhost',function () {
    console.log('8197');
});
dinnerApi.on('close',function(){
    //关闭connection
    connection.end(function (err) {
        if(err){
            return;
        }
        console.log('close connection');
    });
});




