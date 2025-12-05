
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

// Get environment 
const env = process.env.NODE_ENV || "development";

// Read database config
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];

// Create databasethat  hold all models
const db = {};

//Sequelize Connection
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // If using DATABASE_URL env variable
} else {
  // If using config.json credentials (local development)
  sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password,
    config 
  );
}

//  Load All Models from Files

const basename = path.basename(__filename); // Gets 'index.js'

// Read all files in this directory
fs.readdirSync(__dirname)
  .filter((file) => {
    // Keep only .js files
    return (
      file.indexOf(".") !== 0 && 
      file !== basename && 
      file.slice(-3) === ".js" 
    );
  })
  .forEach((file) => {
    // Load user.js, task.js and call them using sequelize 
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    //store model in data base
    db[model.name] = model;
  });


//realationships between models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Pass all models
  }
});


// Test Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Unable to connect to database:", err);
  });
//export all models 
// gonna import it in other file like const { User, Task, sequelize } = require('./models');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
