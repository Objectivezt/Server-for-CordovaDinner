var mysql = require('mysql');
var http = require('http');
//链接centos test表
// var connection = mysql.createConnection({
//     host:'120.24.244.81',
//     user:'root',
//     password:'ecjtuoybm',
//     port:'3306',
//     database:'tests'
// });
var connection = mysql.createConnection({
    host:'120.24.244.81',
    user:'root',
    password:'ecjtuoybm',
    port:'3306',
    database:'nodefordinner'
});


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
connection.query('SELECT * from  zt_greens ',function (err, row, fields) {
    if(err){
        console.log(err);
        return
    }
    console.log(row);
    // console.log(fields);
    // console.log('the solution:', row[0].solution);
});

// var userAddSql = 'INSERT INTO ecjtu_user values(121111,"baomei1","","","","111","111",1,1)';
// var userAdd2Sql = 'INSERT INTO ecjtu_user values(131111,"ouyang1","130266","130999","123456","11","22",1,1)';
// var userAddSql_Params = [];
// connection.query(userAddSql,function (err,result) {
//     if(err){
//         console.log('123');
//     }
//     console.log(result);
// });
// connection.query(userAdd2Sql,function (err,resulft) {
//     console.log(result);
// });
//

var testApi = http.createServer(function (req,res) {
    var url_info  = require('url').parse(req.url, true);
    if(url_info.pathname === '/greensData'){
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        connection.query('SELECT * FROM  zt_greens ',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            res.end(JSON.stringify(rows));
            res.end(rows.join);
        })
    }else if(url_info.pathname === '/shopData'){
        res.writeHead(200,{
            "Content-Type": "text/plain; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
        });
        connection.query('SELECT * FROM  zt_shop ',function (err,rows,fields) {
            if(err){
                console.log(err);
                return
            }
            res.end(JSON.stringify(rows));
            res.end(rows.join);
        })
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
    }
    else{
        req.pipe(res);
    }
});

testApi.listen(8198,'localhost',function () {
    console.log('8198');
});


testApi.on('close',function(){
    //关闭connection
    connection.end(function (err) {
        if(err){

            return;
        }
        console.log('close connection');
    });
});




