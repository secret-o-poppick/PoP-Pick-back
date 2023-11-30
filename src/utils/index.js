require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};

const comparePassword = (password, newPassword) => {
  return bcrypt.compareSync(password, newPassword);
};

const { ACCESS_TOKEN_SECRET } = process.env;

const createAccessToken = ({ _id, email, authority }) => {
  return jwt.sign({ _id, email, authority }, ACCESS_TOKEN_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = { hashPassword, comparePassword, createAccessToken };
