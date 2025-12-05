module.exports=(sequelize, DataTypes)=>{
  const Task = sequelize.define('Task',{
id: {
  type: DataTypes.INTIGER,
  primaryKey: true, //unique identifier for each task
  autoIncrement: true
},
user_id:{
type: DataTypes.INTIGER,
allowNull: false,
references:{
  model: 'User', //ref to user table
  key : 'id'  // rerf to id column
},
onDelete:'CASCADE' // IF the user is deleted delete their tasks too
},
title:{
  type:DataTypes.STRING,
  allowNull: false,
  validate:{
len:[2, 200],
notEmpty: true
  }
},
description:{
  type:DataTypes.TEXT,
  allowNull: false,
  validate:{
    len:[0,1000]
  }
},
status:{
  type: DataTypes.ENUM('pending', 'done'),
  defaultValue: 'pending',
  allowNull: false
},
due_date:{
  type: DataTypes.DATE,
  allowNull: true,
  validate:{
    //day must be in the future
    isAfterToday(Value){
      if(Value && new Date(value) < new Date()){
        throw new Error('Because the date must be in the future');
      }
    }
  }
},
createdAt:{
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW
},
updatedAt:{
  type: DataTypes.DATE,
  defaultValue: DataTypes.NOW    //track the modifications
},
  },{
    timestamps: true,
    underscored: true
});
//associations task belong to user
Task.associate =(models)=>{
  Task.belongTo(models.user,{
    foreignKey: 'user_id',
    onDelete:'CASCADE'
  })
  };
return Task;
}