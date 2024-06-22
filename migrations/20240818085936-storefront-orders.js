'use strict';

let dbMigration;
let dataType;
let seedFunction;
const fs = require('fs');
const path = require('path');
let PromiseDependency;

/**
  * Initialize dbmigrate dependencies and set up environment.
  * Avoid reliance on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbMigration = options.dbmigrate;
  dataType = dbMigration.dataType;
  seedFunction = seedLink;
  PromiseDependency = options.Promise;
};

exports.up = function(database) {
  const migrationFilePath = path.join(__dirname, 'sqls', '20240818085936-storefront-orders-up.sql');
  return new PromiseDependency((resolve, reject) => {
    fs.readFile(migrationFilePath, {encoding: 'utf-8'}, (error, fileContent) => {
      if (error) return reject(error);
      console.log('File content loaded: ' + fileContent);
      resolve(fileContent);
    });
  })
  .then(fileContent => database.runSql(fileContent));
};

exports.down = function(database) {
  const rollbackFilePath = path.join(__dirname, 'sqls', '20240818085936-storefront-orders-down.sql');
  return new PromiseDependency((resolve, reject) => {
    fs.readFile(rollbackFilePath, {encoding: 'utf-8'}, (error, fileContent) => {
      if (error) return reject(error);
      console.log('File content loaded: ' + fileContent);
      resolve(fileContent);
    });
  })
  .then(fileContent => database.runSql(fileContent));
};

exports._meta = {
  version: 1
};
