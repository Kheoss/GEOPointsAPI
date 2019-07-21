const Sequelize = require('sequelize');
const sequelize = new Sequelize('apipoints', 'root', 'password', {
    host: 'localhost',
    port: 6554,
    dialect: 'mysql',
    define: {
      timestamps: false
  },
  logging: false
  });
  module.exports.sequelize = sequelize;