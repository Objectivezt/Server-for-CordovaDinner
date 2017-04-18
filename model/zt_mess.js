/**
 * Created by Jack on 2017/4/17.
 */
module.exports = function (sequelize, DataTypes) {
    var zt_mess = sequelize.define('zt_mess',{
        mid:{
            type:DataTypes.UUID,
            primaryKey:true,
            allowNull:false,
            defaultValue:DataTypes.UUIDV1
        },
        m_nickname:{
            type:DataTypes.VARCHAR
        },
        place:{
            type:DataTypes.VARCHAR
        },
        m_rest:{
            type:DataTypes.VARCHAR
        },
        mf_id:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName:true
    });
    return zt_mess;
};
// freezeTableName: true  这个选项表示，数据库中的表明与程序中的保持一致，否则数据库中的表名会以复数的形式命名