const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require ('../models');
const User = db.User;
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
exports.login = async (req, res)=>{
  try{
    const {email,password} =req.body;
    if (!email || !password){
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }
    const user = await user.findOne({where: {email}});
    if(!user){
      return res.status(404).json({
        message: 'user not found'
      });
    }
    const isPasswordValid = await  user.validatePassword(password);
    if(!isPasswordValid){
      return res.status(401).json({
        message:' invalid password'
      });
    }
    const token = jwt.sign(
      {id:user.id, email:user.email},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    );
    res.status(201).json({
      message: ' login successfully',
      user :{
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    });

  }catch (error){
    console.error('login error:' , error);
    res.status(500).json({
      message: ' login faiuled',
      error : error.message
    });
  }
};