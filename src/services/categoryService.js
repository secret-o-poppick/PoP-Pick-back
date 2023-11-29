const { Category, LocationCategory } = require('../models/index');

/**
 * 분류 Category
 */

// 분류 카테고리 목록 조회
exports.categoryList = async () => {
  const categories = await Category.find({});
  return categories;
};

// 분류 카테고리 상세 조회
exports.categoryDetail = async (categoryId) => {
  const category = await Category.findById({ _id: categoryId });
  return category;
};

/**
 * 지역 Category
 */

// 지역 카테고리 목록 조회
exports.regionCategoryList = async () => {
  const categories = await LocationCategory.find({});
  return categories;
};

// 지역 카테고리 상세 조회
exports.regionCategoryDetail = async (categoryId) => {
  const category = await LocationCategory.findById({ _id: categoryId });
  return category;
};
