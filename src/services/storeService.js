const { cannotHaveAUsernamePasswordPort } = require('whatwg-url');
const { category } = require('../middleware/validator');
const { Store } = require('../models/index');

// 스토어 목록 조희
exports.getStores = async function (query) {
  const {
    page = 1,
    perPage = 8,
    title,
    categoryId,
    adultVerification,
    startDate,
    endDate,
    locationId,
  } = query;
  console.log(typeof query.startDate);

  const conditions = {};
  
  if (title) conditions.title = { $regex: new RegExp(title, 'i') };
  if (categoryId) conditions.categoryId = categoryId;
  if (adultVerification !== undefined)
    conditions.adultVerification = adultVerification;
  if (startDate) conditions.startDate = { $lte: Number(startDate) };
  if (endDate) conditions.endDate = { $gte: Number(endDate) };
  if (locationId) conditions.locationId = { $in: [locationId] };
  const stores = await Store.find(conditions)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  return stores;
};
