const jwt = require('jsonwebtoken');
require('dotenv').config();

const { AuthError } = require('../utils/error');

const { ACCESS_TOKEN_SECRET } = process.env;

const isAuth = (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    if (!auth) {
      throw new AuthError('권한이 없습니다.');
    }

    const accessToken = auth.split(' ')[1];
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        throw new AuthError('권한이 없습니다.');
      }
      req.auth = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { isAuth };
