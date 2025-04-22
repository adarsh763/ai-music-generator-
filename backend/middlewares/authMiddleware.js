const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { jwtSecret } = require('../config/jwt');
const logger = require('../utils/logger');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    logger.error('JWT verification error:', err);
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
}; 