const categoryService = require('../services/categoryService');
const userService = require('../services/userService');

/**
 * User
 */

// 회원 등록
exports.createUser = async (req, res, next) => {
  const data = await userService.createUser(req.body);
  res.status(201).json(data);
};

// 회원 목록 조회
exports.getUsers = async (req, res, next) => {
  const users = await userService.getUsers(req.query);
  res.status(200).json(users);
};

// 회원 상세 조회
exports.getUsersByUserId = async (req, res, next) => {
  const { userId } = req.params;

  const users = await userService.getUsersByUserId(userId);
  res.status(200).json(users);
};

// 회원 권한 변경
exports.updatedUserRole = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 회원 탈퇴
exports.deletetUser = async (req, res, next) => {
  try {
  } catch (e) {}
};

/**
 * 분류 Category
 */

// 분류 카테고리 등록
exports.createCategory = async (req, res, next) => {
  const data = await categoryService.createCategory(req.body);
  res.status(201).json(data);
};

// 분류 카테고리 수정
exports.updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const data = await categoryService.updateCategory(categoryId, req.body);
  res.status(200).json(data);
};

// 분류 카테고리 삭제
exports.deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const data = await categoryService.deleteCategory(categoryId);
  res.status(200).json(data);
};

/**
 * 지역 Category
 */

// 지역 카테고리 등록
exports.createRegionCategory = async (req, res, next) => {};

// 지역 카테고리 수정
exports.updateRegionCategory = async (req, res, next) => {};

// 지역 카테고리 삭제
exports.deleteRegionCategory = async (req, res, next) => {};

/**
 * Store
 */

// 팝업 스토어 목록 조회
exports.getStores = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업 스토어 상세 조회
exports.getStoreById = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업 스토어 등록
exports.createStore = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업 스토어 수정
exports.updateStore = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업 스토어 삭제
exports.deleteStore = async (req, res, next) => {
  try {
  } catch (e) {}
};

// 팝업스토어 활성
exports.setStoreActive = async (req, res, next) => {
  try {
  } catch (e) {}
};
