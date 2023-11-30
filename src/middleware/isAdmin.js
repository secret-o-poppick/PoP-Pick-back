const { ADMIN_ROLE } = require('../config/index');
const { AuthError } = require('../utils/error');

const isAdmin = (req, res, next) => {
  try {
    if (ADMIN_ROLE !== req.auth.role) {
      throw new AuthError('관리자 권한이 없습니다.');
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isAdmin };
