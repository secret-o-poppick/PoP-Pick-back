const { asyncHandler } = require('../../middleware/asyncHandler');
const { Router } = require('express');
const router = Router();

const categoryController = require('../../controllers/categoryController');

/**
 * 분류 Category
 */

// 분류 카테고리 목록 조회
router.get('/', asyncHandler(categoryController.getCategories));

// 분류 카테고리 상세 조회
router.get('/:categoryId', asyncHandler(categoryController.getCategoryById));

module.exports = router;
