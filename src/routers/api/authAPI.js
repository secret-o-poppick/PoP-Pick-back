const { Router } = require('express');
const router = Router();

const authController = require('../../controllers/authController');

const { asyncHandler } = require('../../middleware/asyncHandler');
const { inputValidator, user } = require('../../middleware/validator/index');

const { isAuth } = require('../../middleware/isAuth');

// 관리자 로그인
router.post(
  '/',
  inputValidator(user.login),
  asyncHandler(authController.login)
);

// 카카오 로그인 주소 요청
router.get('/kakao/login', asyncHandler(authController.KakaoLoginPage));

// 카카오 로그인
router.post('/kakao', asyncHandler(authController.KakaoLogin));

// 카카오 연결 끊기
router.post(
  '/kakao/withdrawal',
  isAuth,
  asyncHandler(authController.kakaoWithdrawal)
);

// 카카오 로그아웃
router.post('/kakao/logout', isAuth, asyncHandler(authController.kakaoLogout));

module.exports = router;
