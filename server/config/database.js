const Sequilize = require('sequelize');

module.exports = new Sequilize(
    'agenciadeviajes',
    'root',
    'root', {
        host: '127.0.0.1',
        port: '8080',
        dialect: 'mysql',
        define: {
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
    }
);