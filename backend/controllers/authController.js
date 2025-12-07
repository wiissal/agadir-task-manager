const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "please provide name , email and password",
      });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already registred",
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({
      message: "User registred successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "registration field",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide email and password'
      });
    }
    
    const foundUser = await User.findOne({ where: { email } });
    
    if (!foundUser) {
      return res.status(404).json({
        message: 'user not found'
      });
    }
    
    const isPasswordValid = await foundUser.validatePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'invalid password'
      });
    }
    
    
    // console.log('Found user:', foundUser.id, foundUser.email);
    
    const payload = {
      id: foundUser.id,
      email: foundUser.email
    };
    
    // console.log('Token payload:', payload);
    
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // console.log('Generated token:', token);
    
    res.status(200).json({
      message: 'login successfully',
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      },
      token
    });

  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({
      message: 'login failed',
      error: error.message
    });
  }
};