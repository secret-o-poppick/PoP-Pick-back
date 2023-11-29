const categoryService = require('../services/categoryService');

/**
 * 분류 Category
 */

// 분류 카테고리 목록 조회
exports.getCategories = async (req, res, next) => {
  const categories = await categoryService.categoryList();
  res.status(200).json(categories);
};

// 분류 카테고리 상세 조회
exports.getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await categoryService.categoryDetail(categoryId);
  res.status(200).json(category);
};

/**
 * 지역 Category
 */

// 지역 카테고리 목록 조회
exports.getRegionCategories = async (req, res, next) => {
  const categories = await categoryService.regionCategoryList();
  res.status(200).json(categories);
};

// 지역 카테고리 상세 조회
exports.getRegionCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  const category = await categoryService.regionCategoryDetail(categoryId);
  res.status(200).json(category);
};
