const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('usermanagement', 'air-m2', 'root', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres', // or the database dialect you're using 
});

module.exports = sequelize;