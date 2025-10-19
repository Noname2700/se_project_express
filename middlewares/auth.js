const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UNAUTHORIZED_STATUS } = require('../utils/errors');

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(UNAUTHORIZED_STATUS).send({ message: 'Authorization required' });
    }
    const token = authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    res.status(UNAUTHORIZED_STATUS).send({ message: 'Authorization required' });
  }
};


module.exports = auth;
