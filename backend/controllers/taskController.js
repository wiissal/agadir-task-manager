const {task ,user} = require ('../models');

exports.getTasks = async (req,res)=>{
  try{
    const userId = req.used.id;
    const tasks = await task.findAll({
      where: {user_id:userId},
      order: [['createdAt' ,'DESC']]
    });
    res.status(200).json({
      message: 'loading tasks succesfully',
      tasks
    });
  }catch (error){
    console.error('get taks error:',error);
    res.status(500).json({
      message: 'failed to load tasks',
      error : error.message
    });
  }
};