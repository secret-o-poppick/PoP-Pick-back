const { Router } = require('express');
const router = Router();

const adminController = require('../../controllers/adminController');

/*
 * TODO : 데이터 검증 middleware 추가
 */

// 회원 목록 조회
router.get('/users', adminController.getUsersInfo);

// 회원 상세 조회
router.get('/users/:id', adminController.getUsersInfoByUserId);

// 회원 권한 변경
router.put('/users/:id', adminController.updatedUserRole);

// 회원 탈퇴
router.delete('/users/:id', adminController.deletetUser);

/**
 * 분류 Category
 */

// 분류 카테고리 등록
router.post('/categories', adminController.createCategory);

// 분류 카테고리 수정
router.put('/categories/:categoryId', adminController.updateCategory);

// 분류 카테고리 삭제
router.delete('/categories/:categoryId', adminController.deleteCategory);

/**
 * 지역 Category
 */

// 지역 카테고리 등록
router.post(
  '/categories/regionCategories',
  adminController.createRegionCategory
);

// 지역 카테고리 수정
router.put(
  '/categories/regionCategories/:categoryId',
  adminController.updateRegionCategory
);

// 지역 카테고리 삭제
router.delete(
  '/categories/regionCategories/:categoryId',
  adminController.deleteRegionCategory
);

/**
 * Store
 */

// 팝업 스토어 목록 조회
router.get('/stores', adminController.getStores);

// 팝업 스토어 상세 조회
router.get('/stores/:id', adminController.getStoreById);

// 팝업 스토어 등록
router.post('/stores', adminController.createStore);

// 팝업 스토어 수정
router.post('/stores/:id', adminController.updateStore);

// 팝업 스토어 삭제
router.delete('/stores/:id', adminController.deleteStore);

// 팝업스토어 활성
router.get('/stores/:id/active', adminController.setStoreActive);

module.exports = router;
