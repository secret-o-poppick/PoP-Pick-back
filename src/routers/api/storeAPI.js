const { Router } = require("express");
const router = Router();

const storeController = require("../../controllers/storeController");

/*
 * TODO : 데이터 검증 middleware 추가
 */

//팝업 스토어 목록 조회
router.get("/", storeController.getStores);

//팝업 스토어 상세 조회
router.get("/:storeId", storeController.getStoresByStoreId);

//팝업 스토어 조회수 증가
router.put("/views", storeController.incrementViews);

//팝업 스토어 북마크 표시
router.put("/bookmarks", storeController.addBookmarks);

//팝업 스토어 좋아요 표시
router.put("/likes", storeController.addLikes);

module.exports = router;
