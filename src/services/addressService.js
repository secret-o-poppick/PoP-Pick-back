const { Address } = require("../models/index");

exports.getAddressesByCoordinate = async (query) => {
  const { x1, x2, y1, y2 } = query;
  // console.log(x1, x2, y1, y2);
  const addresses = await Address.find({
    x: { $gt: x1, $lt: x2 }, // x1보다 크고 x2보다 작은 범위
    y: { $gt: y1, $lt: y2 }, // y1보다 크고 y2보다 작은 범위
  })
    .populate({
      path: "store",
      model: "Store",
      populate: {
        path: "categoryId",
        model: "Category",
      },
    })
    .exec();
  return addresses;
};

exports.createAddress = async (body) => {
  const address = await Address.create(body);
  return address;
};
