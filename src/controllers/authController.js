const userService = require('../services/userService');
const kakaoService = require('../services/kakaoService');

// 관리자 로그인
exports.login = async (req, res, next) => {
  const data = await userService.adminLogin(req.body);
  res.status(200).json(data);
};

// 카카오 로그인 페이지
exports.KakaoLoginPage = async (req, res, next) => {
  const data = await kakaoService.KakaoLoginPage();
  res.status(200).json(data);
};

// 카카오 로그인
exports.KakaoLogin = async (req, res, next) => {
  const data = await kakaoService.kakaoLogin(req.body);
  res.status(200).json(data);
};

// 카카오 로그아웃
exports.kakaoLogout = async (req, res, next) => {
  const data = await kakaoService.kakaoLogout(req.auth.sub);
  res.status(200).json(data);
};

// 카카오 연결 끊기
exports.kakaoWithdrawal = async (req, res, next) => {
  const data = await kakaoService.kakaoWithdrawal(req.auth.sub);
  res.status(200).json(data);
};
