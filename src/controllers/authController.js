const userService = require('../services/userService');

// 관리자 로그인
exports.login = async (req, res, next) => {
  const data = await userService.adminLogin(req.body);
  res.status(200).json(data);
};
