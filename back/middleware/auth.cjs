const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token'); 

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    let tokenToVerify = token;
    if (token.startsWith('Bearer ')) {
        tokenToVerify = token.slice(7, token.length);
    }

    const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};