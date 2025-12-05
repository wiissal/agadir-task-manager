
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  
  // Define User model
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],        
        notEmpty: true       
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,         
        isEmail: true         
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255]         
      }
    }
    
  }, {
    // Model options
    sequelize,                // Pass sequelize instance
    modelName: 'User',        // Model name
    tableName: 'users',       // Database table name
    timestamps: true,         // Add createdAt, updatedAt
    underscored: true         // Use snake_case: created_at
  });
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // METHOD Check password during login
  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};