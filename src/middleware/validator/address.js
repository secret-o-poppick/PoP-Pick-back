const { ValidationError } = require("../../utils/error");

exports.coordinateValidator = (req, res, next) => {
  const { x1, x2, y1, y2 } = req.query;
  try {
    if (!x1 || !x2 || !y1 || !y2) {
      throw new ValidationError("좌표가 정확하지 않습니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

exports.createValidator = (req, res, next) => {
  const { zipCode, detail1, x, y, store } = req.body;
  // detail2 = required : false
  try {
    if (!zipCode || !detail1 || !x || !y || !store) {
      throw new ValidationError("입력값이 정확하지 않습니다.");
    }
    next();
  } catch (error) {
    next(error);
  }
};
