const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'; // see what env  if its dev or test or prod otherwise will choose dev by default 
const config = require(path.join(__dirname, '..','config','config.json'))[env]; 
const db={}; //it gonna hold all models

//sequelize instance
let sequelize;
if(config.use_env_variable){
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // if werw using db url env variable
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);//if we use config,json 
}