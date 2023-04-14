const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"];

  // If no token is provided, send a 401 (Unauthorized) response
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    // If the token is not valid, send a 403 (Forbidden) response
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
