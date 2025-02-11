// Middleware to check if the authenticated user has the required role(s)
const roleMiddleware = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      // Check if the user's role is included in the list of allowed roles
      if (!roles.includes(userRole)) {
        return res.status(403).json({ error: 'Access denied: you are not allowed' });
      }
      next();
    };
  };
  
  export default roleMiddleware;
  