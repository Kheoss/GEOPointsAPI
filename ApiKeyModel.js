const Sequelize = require('sequelize');
const sequelize = require('./DBConnector').sequelize;
const ApiKeyModel = sequelize.define('ApiKeys', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   api_key: {
       type:Sequelize.STRING
   }
  }, {
  });

  module.exports.ApiKeyModel = ApiKeyModel;