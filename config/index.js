var db = {
    sequelize:{
        username: 'root',
        password: '',
        database: 'tests',
        host: "120.24.244.81",
        dialect: 'mysql',
        define: {
            underscored: false,
            timestamps: true,
            paranoid: true
        }
    }
};

module.exports = db;