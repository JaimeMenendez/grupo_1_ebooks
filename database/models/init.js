'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const mysql = require('mysql2/promise');
const db = {};
let librosjson = require('../../DB/librosDB.json');
let usersjson = require('../../DB/usersDB.json');

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
      await connection.query(`DROP DATABASE IF EXISTS \`${config.database}\`;`);
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

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  global.db = db;

  await sequelize.sync({ force: true });

  await db.rol.bulkCreate([{nombre: "cliente"},{nombre: "admin"}]);

  for (const libro of librosjson) {
    let libroDB = await db.libro.create(libro);
    let subcategoria = await db.subcategoria.findOrCreate({ where: { nombre: libro.subcategoria } });
    let categoria = await db.categoria.findOrCreate({ where: { nombre: libro.categoria } });
    await subcategoria[0].addLibro(libroDB);
    await categoria[0].addLibro(libroDB);
    await categoria[0].addSubcategoria(subcategoria[0]);
  }

  for (const user of usersjson) {
    let userDB = await db.usuario.create(user);
    if(user.direcciones){
      for (const direccion of user.direcciones) {
        delete direccion.id
        let direccionDB = await db.direccion.create(direccion);
        await direccionDB.setUsuarios(userDB);
      }
    }

    if(user.facturacion){
      for (const facturacion of user.facturacion) {
        delete facturacion.id
        let facturacionDB = await db.datosFacturacion.create(facturacion);
        await facturacionDB.setDireccion(await db.direccion.findByPk(facturacion.idDireccion));
      }
    }
  }

}

module.exports = initialize;
