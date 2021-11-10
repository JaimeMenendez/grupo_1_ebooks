'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const mysql = require('mysql2/promise');
const db = {};

const initialize = async () => {
  let sequelize;

  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    if (config.dialect === 'mysql') {
      let connection = await mysql.createConnection({
        host: config.host,
        user: config.username,
        password: config.password
      });
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
    }
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

  fs
    .readdirSync(__dirname)
    .filter(file => {
      console.log(file);
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file !== 'init.js') && (file !== 'models.js') && (file.slice(-3) === '.js');
    })
    .forEach(file => {

      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return sequelize.sync({ force: true });
}

module.exports = initialize;
