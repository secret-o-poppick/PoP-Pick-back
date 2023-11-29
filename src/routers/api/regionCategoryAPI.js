const { asyncHandler } = require('../../middleware/asyncHandler');
const { Router } = require('express');
const router = Router();

const categoryController = require('../../controllers/categoryController');

/**
 * 지역 Category
 */

// 지역 카테고리 목록 조회
router.get('/', asyncHandler(categoryController.getRegionCategories));

// 지역 카테고리 상세 조회
router.get(
  '/:categoryId',
  asyncHandler(categoryController.getRegionCategoryById)
);

module.exports = router;
