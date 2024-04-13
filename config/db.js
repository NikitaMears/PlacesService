const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('usermanagement', 'postgres', 'Snotify(:2320', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres', // or the database dialect you're using 
});

module.exports = sequelize;