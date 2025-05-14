import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc    Register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, securityQuestion, securityAnswer } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    password,
    securityQuestion,
    securityAnswer
  });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    token: generateToken(user._id)
  });
});

// @desc    Authenticate user
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

 const user = await User.findOne({ username });
  if (!user) {
    console.log('User not found');
    res.status(401);
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Password does not match');
    res.status(401);
    throw new Error('Invalid credentials');
  }

  res.json({
    _id: user._id,
    username: user.username,
    token: generateToken(user._id)
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export { registerUser, loginUser };