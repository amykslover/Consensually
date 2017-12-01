'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//MYSQL CODE FOR CREATING DATABASE TABLES FROM SEQUELIZE
//Executing (default): CREATE TABLE IF NOT EXISTS `Users` (`id` INTEGER NOT NULL auto_increment , `userToken` VARCHAR(255), `userName` VARCHAR(255), `userEmail` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
//Executing (default): SHOW INDEX FROM `Users` FROM `consensually`
//Executing (default): CREATE TABLE IF NOT EXISTS `Codes` (`id` INTEGER NOT NULL auto_increment , `code` INTEGER, `codeType` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserId` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;
//Executing (default): SHOW INDEX FROM `Codes` FROM `consensually`
//Executing (default): CREATE TABLE IF NOT EXISTS `Encounters` (`id` INTEGER NOT NULL auto_increment , `encounterStatus` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
//Executing (default): SHOW INDEX FROM `Encounters` FROM `consensually`
//Executing (default): CREATE TABLE IF NOT EXISTS `UserEncounters` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `EncounterId` INTEGER , `UserId` INTEGER , PRIMARY KEY (`EncounterId`, `UserId`), FOREIGN KEY (`EncounterId`) REFERENCES `Encounters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;
//Executing (default): SHOW INDEX FROM `UserEncounters` FROM `consensually`