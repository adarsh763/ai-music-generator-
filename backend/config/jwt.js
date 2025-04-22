module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecretkey',
  jwtExpiresIn: '7d' // tokens valid for 7 days
}; 