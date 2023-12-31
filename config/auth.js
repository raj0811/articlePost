const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mykey';

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, JWT_SECRET);

    // Check if the token is valid
    if (!decodedToken) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Store the decoded token in the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      // Handle invalid signature error
      return res.status(401).json({ error: 'Invalid token signature' });
    }

    console.error(error);
    return res
      .status(500)
      .json({ error: 'An error occurred during authentication' });
  }
};
