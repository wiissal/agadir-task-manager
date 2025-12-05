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
}








  })





}