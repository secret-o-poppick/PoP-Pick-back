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

  const conditions = {};

  if (title) conditions.title = { $regex: new RegExp(title, 'i') };
  if (startDate || endDate) {
    conditions.$or = [
      { startDate: { $gte: Number(startDate), $lte: Number(endDate) } },
      { endDate: { $gte: Number(startDate), $lte: Number(endDate) } },
      {
        $and: [
          { startDate: { $lte: Number(startDate) } },
          { endDate: { $gte: Number(endDate) } },
        ],
      },
    ];
  }

  if (locationId) conditions.locationId = { $in: [locationId] };
  const stores = await Store.find(conditions)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  return stores;
};
