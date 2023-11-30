const { ObjectId } = require('mongodb');
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
  const categories = await LocationCategory.aggregate([
    {
      $match: {
        ancestors: { $size: 1 }, // ancestors 길이가 1
        parent: { $exists: true }, // parent가 존재
      },
    },
    {
      $lookup: {
        from: 'locationcategories',
        localField: 'parent',
        foreignField: '_id',
        as: 'parentData',
      },
    },
    {
      $unwind: '$parentData',
    },
    {
      $group: {
        _id: '$parentData', // 부모를 기준으로 그룹화
        children: {
          $push: {
            _id: '$_id',
            name: '$name',
            code: '$code',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        code: '$_id.code',
        createdAt: '$_id.createdAt',
        updatedAt: '$_id.updatedAt',
        children: 1,
      },
    },
  ]);
  return categories;
};

// 지역 카테고리 상세 조회
exports.regionCategoryDetail = async (categoryId) => {
  const category = await LocationCategory.aggregate([
    {
      $lookup: {
        from: 'locationcategories',
        localField: 'parent',
        foreignField: '_id',
        as: 'parentData',
      },
    },
    {
      $unwind: '$parentData',
    },
    {
      $group: {
        _id: '$parentData', // 부모를 기준으로 그룹화
        children: {
          $push: {
            _id: '$_id',
            name: '$name',
            code: '$code',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
      },
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        code: '$_id.code',
        createdAt: '$_id.createdAt',
        updatedAt: '$_id.updatedAt',
        children: 1,
      },
    },
    {
      $match: {
        $or: [
          { _id: new ObjectId(categoryId) },
          { parent: new ObjectId(categoryId) },
        ],
      },
    },
  ]);
  return category;
};
