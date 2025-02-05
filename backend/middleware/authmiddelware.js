const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key'; // Use a secure secret in production
const authMiddleware = (req, res, next) => {
    try {
      // Extract the token from the Authorization header (Bearer token)
      const authHeader = req.headers.authorization;
      
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication token missing or invalid.' });
      }
  
      const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"
  
      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // Attach user info to the request object
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
  
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Error in auth middleware:', error.message);
  
      // Return error response for invalid or expired token
      return res.status(401).json({
        success: false,
        message: error.name === 'TokenExpiredError' ? 'Token expired.' : 'Invalid or expired token.',
      });
    }
  };
module.exports = authMiddleware;
