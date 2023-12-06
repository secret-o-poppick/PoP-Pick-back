const { mongoose, Types } = require('mongoose');
const { ValidationError } = require('../utils/error');
const { Store, User } = require('../models/index');

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
    .populate('address')
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

//팝업 스토어 북마크 표시
exports.updateBookmarks = async (storeId, userId) => {
  if (!Types.ObjectId.isValid(storeId) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('storeId, userId가 정확하지 않습니다.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    const store = await Store.findById(storeId).session(session);

    const userHasBookmarked = user.bookmarks.includes(storeId);

    if (userHasBookmarked) {
      // store.bookmarks -= 1;
      user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storeId);
    } else {
      // store.bookmarks += 1;
      user.bookmarks.push(storeId);
    }

    // await store.save();
    await user.save();

    await session.commitTransaction();
    session.endSession();

    return store;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};

//팝업 스토어 좋아요 표시
exports.updateLikes = async (storeId, userId) => {
  if (!Types.ObjectId.isValid(storeId) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('storeId, userId가 정확하지 않습니다.');
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findById(userId).session(session);
    const store = await Store.findById(storeId).session(session);

    const userHasBookmarked = user.likes.includes(storeId);

    if (userHasBookmarked) {
      store.likes -= 1;
      user.likes = user.likes.filter((id) => id.toString() !== storeId);
    } else {
      store.likes += 1;
      user.likes.push(storeId);
    }

    await store.save();
    await user.save();

    await session.commitTransaction();
    session.endSession();

    return store;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
  }
};
