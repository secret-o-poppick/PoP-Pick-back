const userService = require('../services/userService');

// 사용자 정보 조회
exports.getUserInfo = async (req, res, next) => {
  const user = await userService.getUsersByUserId(req.auth._id);
  res.status(200).json(user);
};

// 사용자 정보 수정
exports.updateUserInfo = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 사용자 정보 삭제
exports.deleteUserInfo = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업스토어 목록 조회(북마크)
exports.getUserBookmarks = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업스토어 목록 조회 (좋아요)
exports.getUserLikes = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 권한 신청
exports.requestRegister = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 : 등록한 팝업 스토어 목록 조회
exports.getRegisterStores = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 : 등록한 팝업 스토어 상세 조회
exports.getRegisterStoresByStoreId = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 : 팝업 스토어 등록
exports.createRegisterStore = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 : 팝업 스토어 수정
exports.updateRegisterStore = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 등록자 : 팝업 스토어 삭제
exports.deleteRegisterStore = async (req, res, next) => {
  try {
  } catch (e) {}
};
