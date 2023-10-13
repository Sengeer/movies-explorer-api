const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { ERROR_MESSAGE } = require('../utils/constants');
const CONFIG = require('../config');
require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError(ERROR_MESSAGE.COMMON.UNAUTHORIZED));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV !== 'production'
        ? CONFIG.JWT_SECRET
        : JWT_SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE.COMMON.UNAUTHORIZED));
    return;
  }
  req.user = payload;
  next();
};
