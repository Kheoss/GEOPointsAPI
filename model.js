const Sequelize = require('sequelize');
const sequelize = require('./DBConnector').sequelize;
const PointsTable = sequelize.define('Points', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
      type: Sequelize.STRING
    },
    coordonates: {
        type: Sequelize.GEOMETRY('POINT')        
    }
  }, {
  });

  module.exports.PointsTable = PointsTable;