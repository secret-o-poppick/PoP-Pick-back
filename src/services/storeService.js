const { cannotHaveAUsernamePasswordPort } = require("whatwg-url");
const { category } = require("../middleware/validator");
const { Store } = require("../models/index");
const { NotFoundError } = require("../utils/error");

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
      { startDate: { $gte: startDate, $lte: endDate } },
      { endDate: { $gte: startDate, $lte: endDate } },
      {
        $and: [
          { startDate: { $lte: startDate } },
          { endDate: { $gte: endDate } },
        ],
      },
    ];
  }
  if (locationId) conditions.locationId = { $in: [locationId] };

  if (adultVerification) conditions.adultVerification = true;

  const stores = await Store.find(conditions)
    .populate('categoryId')
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  return stores;
};

// 스토어 상세 조회
exports.getStoreById = async (params) => {
  const store = await Store.findOne({ _id: params.storeId })
    .populate("address")
    .exec();
  console.log(store);
  return store;
};

// 스토어 등록
exports.createStore = async (body) => {
  console.log(body);
  const store = await Store.create(body.storeInfo);

  return store;
};
