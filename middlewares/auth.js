const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnAuthorizedError = require("./errors/unAuthorizeError");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UnAuthorizedError("Authorization required");
    }

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    throw new UnAuthorizedError("Authorization required");
  }
};

module.exports = auth;
