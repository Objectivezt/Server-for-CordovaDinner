
var mysql = require('mysql');
var http = require('http');
var url = require('url');
var query = require('querystring');
//链接centos 数据库
var connection = mysql.createConnection({
    host:'120.24.244.81',
    user:'root',
    password:'ecjtuoybm',
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
    }


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
            checkLogin(res,req,loginStuid,loginPassword);
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
    }else if(url_info.pathname === '/greensDetailsData'){
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
            console.log('用户登录数据接收完毕');
            //转化为JSON对象
            shopPageObj = JSON.parse(shopPageData);
            console.log(shopPageObj);
            shopPage = shopPageObj.ParamId;
            selectShopData(res,shopPage);
        });
    }else if(url_info.pathname === '/messData'){
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
    }else if(url_info.pathname === '/setting'){
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        //SELECT * FROM  zt_user where uid ="'+UserId+'"
        connection.query('SELECT * FROM  zt_user where uid ="10001"',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            console.log(rows);
            res.end(JSON.stringify(rows));
            res.end(rows.join);
        })
    }
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




