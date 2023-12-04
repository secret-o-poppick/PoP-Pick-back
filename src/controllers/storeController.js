const storeService = require("../services/storeService");
const { Types } = require("mongoose");
const { ValidationError } = require("../utils/error");

//팝업 스토어 목록 조회
exports.getStores = async (req, res, next) => {
  const stores = await storeService.getStores(req.query);
  res.json(stores);
};

//팝업 스토어 상세 조회
exports.getStoresByStoreId = async (req, res, next) => {
  try {
    if (!Types.ObjectId.isValid(req.params.storeId)) {
      throw new ValidationError("storeId가 정확하지 않습니다.");
    }
    const store = await storeService.getStoreById(req.params);
    res.json(store);
  } catch (e) {
    next(e);
  }
};

//팝업 스토어 조회수 증가
exports.incrementViews = async (req, res, next) => {
  try {
  } catch (e) {}
};

//팝업 스토어 북마크 표시
exports.addBookmarks = async (req, res, next) => {
  try {
  } catch (e) {}
  s;
};

//팝업 스토어 좋아요 표시
exports.addLikes = async (req, res, next) => {
  try {
  } catch (e) {}
};
