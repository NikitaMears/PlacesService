const { DataTypes } = require('sequelize');
const db = require('../config/db');
const Places = db.define('Places', {

  userId: {
    type: DataTypes.INTEGER
  },
  coordinates: {
    type: DataTypes.JSONB
  },
  properties: {
    type: DataTypes.JSONB 
  },

});

module.exports = Places;
