const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development'; // see what env  if its dev or test or prod otherwise will choose dev by default 
const config = require(path.join(__dirname, '..','config','config.json'))[env]; 
const db={}; //it gonna hold all models

