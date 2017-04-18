/**
 * Created by Jack on 2017/4/17.
 */
var config = require('../config');
var Sequelize = require('sequelize');
var dbs = {
    sequelize: new Sequelize(
        config.sequelize.database,
        config.sequelize.username,
        config.sequelize.password,
        config.sequelize
    )
};
dbs.zt_mess= dbs.sequelize.import('../model/zt_mess.js');
module.exports = dbs;