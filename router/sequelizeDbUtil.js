/**
 * Created by Jack on 2017/4/28.
 */
var Sequelize =  require('sequelize');
var sqldb = require('./sqldb');
sqldb.sequelize.sync({force:false}).then(function () {
   console.log('server successed');
}).catch(function(err){
    console.log("Server failed to start due to error: %s", err);
});
var sequelize = new Sequelize('tests','root','ecjtuoybm',{host:'120.24.244.81',port:'3306', dialect : 'mysql'})
var User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
    return User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
}).then(function(jane) {
    console.log(jane.get({
        plain: true
    }));
});