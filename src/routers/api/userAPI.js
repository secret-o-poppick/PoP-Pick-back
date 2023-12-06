const { Router } = require('express');
const router = Router();

const { asyncHandler } = require('../../middleware/asyncHandler');

const userController = require('../../controllers/userController');

/*
 * TODO : 데이터 검증 middleware 추가
 */
// 사용자 정보 조회
router.get('/', asyncHandler(userController.getUserInfo));

// 사용자 정보 수정
router.put('/', userController.updateUserInfo);

// 사용자 정보 삭제
router.delete('/', userController.updateUserInfo);

// 팝업스토어 목록 조회(북마크)
router.get('/bookmarks', asyncHandler(userController.getUserBookmarks));

// 팝업스토어 목록 조회 (좋아요)
router.get('/likes', asyncHandler(userController.getUserLikes));

// 등록자 권한 신청
router.put('/authorizations', userController.requestRegister);

// 등록자 : 등록한 팝업 스토어 목록 조회
router.get('/stores', userController.getRegisterStores);

// 등록자 : 등록한 팝업 스토어 상세 조회
router.get('/stores/:id', userController.getRegisterStoresByStoreId);

// 등록자 : 팝업 스토어 등록
router.post('/stores', userController.createRegisterStore);

// 등록자 : 팝업 스토어 수정
router.put('/stores/:id', userController.updateRegisterStore);

// 등록자 : 팝업 스토어 삭제
router.delete('/stores/:id', userController.deleteRegisterStore);

module.exports = router;
