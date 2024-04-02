const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Client = require('./Client');
const Service = db.define('Service', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  
  });
  
  // Client.hasMany(Service, { foreignKey: 'clientId' });
  // Service.belongsTo(Client, { foreignKey: 'clientId' });
  
  module.exports =Service;