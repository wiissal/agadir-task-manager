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
//read all file 
fs.readdirSync(__dirname) 
.filter((file)=>{ 
return(
  file.indexOf('.')!== 0 &&  //ignore hidden files
  file !== basename && // index
  file.slice(-3) === '.js'
);
})
.forEach((file)=>{
  const model = sequelize.import(path.join(__dirname, file)); //import mpdel and right after add them to DB
  db[model.name] = model;
});
const basename = path.basename(__filename); // store ref for easy access
//relationships
Object.keys(db).forEach((modelName)=>{
  if(db[modelName].associate){
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // add sequelize instance to db
db.Sequelize = Sequelize; // add sequelize to db

module.exports = db;
