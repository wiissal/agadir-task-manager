
module.exports = (sequelize, DataTypes) => {
  
  // Define Task model
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',       // References users table
        key: 'id'             // References users.id
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 200],        
        notEmpty: true        
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,      
      validate: {
        len: [0, 1000]        
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'done'),  
      defaultValue: 'pending',                   
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true        
    }
    
  }, {
    // Model options 
    sequelize,                // Pass sequelize instance
    modelName: 'Task',        // Model name
    tableName: 'tasks',       // Database table name
    timestamps: true,         // Add createdAt, updatedAt
    underscored: true         // Use snake_case: created_at
  });

  // Defines relationship: One User has Many Tasks
  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'     // Delete task if user is deleted
    });
  };

  return Task;
};