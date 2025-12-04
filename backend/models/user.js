const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes } = require("sequelize");
const { underscoredIf } = require("sequelize/lib/utils");
//define the user model
module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("User", {
    id: {
      type: DataTypes.INTIGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len : [6, 255],
      }
    },
    createdAt:{
      type: DataTypes.DATE, //TRACK ACCOUNT CREATIion auto generate with sequelize
      defaultValue: DataTypes.NOW
    }
  },{
    timetamps: true,
    underscored: true
  });
};
