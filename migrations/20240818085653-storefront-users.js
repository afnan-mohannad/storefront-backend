'use strict';

let dbMigration;
let dataType;
let seedFunction;
const fs = require('fs');
const path = require('path');
let PromiseDependency;

/**
  * Setup the dependencies from dbmigrate initially.
  * This removes reliance on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbMigration = options.dbmigrate;
  dataType = dbMigration.dataType;
  seedFunction = seedLink;
  PromiseDependency = options.Promise;
};

exports.up = function(database) {
  const migrationFilePath = path.join(__dirname, 'sqls', '20240818085653-storefront-users-up.sql');
  return new PromiseDependency((resolve, reject) => {
    fs.readFile(migrationFilePath, {encoding: 'utf-8'}, (error, fileData) => {
      if (error) return reject(error);
      console.log('File data loaded: ' + fileData);
      resolve(fileData);
    });
  })
  .then(fileData => database.runSql(fileData));
};

exports.down = function(database) {
  const rollbackFilePath = path.join(__dirname, 'sqls', '20240818085653-storefront-users-down.sql');
  return new PromiseDependency((resolve, reject) => {
    fs.readFile(rollbackFilePath, {encoding: 'utf-8'}, (error, fileData) => {
      if (error) return reject(error);
      console.log('File data loaded: ' + fileData);
      resolve(fileData);
    });
  })
  .then(fileData => database.runSql(fileData));
};

exports._meta = {
  "version": 1
};
