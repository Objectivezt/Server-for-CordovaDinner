/**
 * Created by admin on 2017/4/10.
 */
//加载模块
var express = require('express');
var swig = require('swig');
var mysql = require('mysql');
var path=require("path");
// var Sequelize =  require('sequelize');
// var sqldb = require('./sqldb');
// sqldb.sequelize.sync({force:false}).then(function () {
//    console.log('server successed');
// }).catch(function(err){
//     console.log("Server failed to start due to error: %s", err);
// });


//创建app应用 相当于Node.js Http.CreateServer();
var app = express();

var connection = mysql.createConnection({
    host:'120.24.244.81',
    user:'root',
    password:'ecjtuoybm',
    port:'3306',
    database:'tests'
});
// var sequelize = new Sequelize('tests','root','ecjtuoybm',{host:'120.24.244.81',port:'3306', dialect : 'mysql'})
// var User = sequelize.define('user', {
//     username: Sequelize.STRING,
//     birthday: Sequelize.DATE
// });

// sequelize.sync().then(function() {
//     return User.create({
//         username: 'janedoe',
//         birthday: new Date(1980, 6, 20)
//     });
// }).then(function(jane) {
//     console.log(jane.get({
//         plain: true
//     }));
// });
//__dirname为程序执行时的绝对路径。
// app.use(express.static(path.join('/public/bower_components/angluar/angular-1.6.4/angular.js', 'public')));
app.use('/public',express.static( path.join(__dirname + '/public')));

//表示参数表示模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法

app.engine('html',swig.renderFile);
//设置模板文件的存放目录，第一个参数必须是views  第二个参数必须是参数的目录
app.set('views','./views');
//注册所需要的模板引擎，第一个参数必须是views engine 第二个参数必须是app.engines定义的模板引擎的名称（与第一个参数一致）
app.set('view engine','html');
//开发过程中取消模板缓存
swig.setDefaults({cache: false});



//管理员
app.use('/admin',require('./router/admin'));
//常用的api
app.use('/api',require('./router/api'));
//主页
app.use('/',require('./router/main'));
//店铺管理

app.use('/categorys',require('./router/categorys'));
//菜品管理
app.use('/food',require('./router/food'));
//菜品评论管理
app.use('/comment',require('./router/comment'));
app.use('/stores',require('./router/stores'));
//菜品分类管理

app.listen(8199);

//首页的默认
app.get('/',function (req,res,next) {
    //req表示保存客户端请求相关数据
    // res.send('<h1>欢迎管理餐厅管理系统</h1>')

    //res表示服务端输出的对象，提供了一些相关的服务端输出的方法
    // res:
    //next表示，用于执行下一个路径匹配的函数

    // res.render()是读取views目录下的指定文件，解析并返回给客户端
    //其中起一个参数是相对views的目录
    // 第二个参数是传递给模板引擎的数据
    res.render('index');
});
console.log('hellojs');


//创建一个connection
connection.connect(function (err) {
    if(err){
        console.log(err);
        return
    }
    console.log('connection suceesful');
});
//测试执行sql语句
connection.query('SELECT * from ecjtu_user',function (err, row, fields) {
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
//关闭connection
connection.end(function (err) {
    if(err){

        return;
    }
    console.log('close connection');
});
