const { Router } = require('express');
const router = Router();

const authController = require('../../controllers/authController');

const { asyncHandler } = require('../../middleware/asyncHandler');
const { inputValidator, user } = require('../../middleware/validator/index');

// 관리자 로그인
router.post(
  '/',
  inputValidator(user.login),
  asyncHandler(authController.login)
);

router.post('/kakao', asyncHandler(authController.KakaoLogin));

module.exports = router;
