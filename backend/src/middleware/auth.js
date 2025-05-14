import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Invalid token');
  }
});

export { protect };