const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // Check for the "Bearer" scheme
    const [scheme, token] = authHeader.split(' ');
  
    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header format' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      req.user = user;
      next();
    });
  }
  
  module.exports = authenticateToken;
  
