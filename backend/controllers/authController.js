const bcrypt = required('bcryptjs');
const jwt = required('jsonwebtoken');
const {user} = required ('../models');
exports.register = async (req, res)=>{
  try{
    const{name, email, password}= req.body;
    if(!name || !email || !password){
      return res.status(400).json({
        message: 'please provide name , email and password'
      });
    }
    const existingUser= await user.findOne({where:{email}});
    if(existingUser){
      return res.status(409).json({
        message: 'Email already registred'
      });
    }
    const newUser = await user.create({
      name,
      email,
      password 
    });
    const token = jwt.sign(
      {
        id :newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {expireIn:'7d'}
    );
    res.status(201).json({
      message: 'User registred successfully',
      user:{
        id:newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });
  }catch (error){
    console.error('Register error:' , error);
    res.status(500).json({
      message: 'registration field',
      error: error.message
    });
  }
};