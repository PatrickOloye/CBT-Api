// Increment login count when user logs in
UserSchema.methods.incrementLoginCount = function() {
  this.loginCount += 1;
  return this.save();
};



const RateLimit = require('express-rate-limit');

// Rate limiting middleware to prevent brute-force attacks
const ApiRateLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // max 5 attempts
  message: 'Too many attempts, please try again after some time'
});

module.exports = ApiRateLimiter;