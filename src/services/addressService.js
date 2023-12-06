const { Address } = require('../models/index');
const { Store } = require('../models/index');

exports.getAddressesByCoordinate = async (query) => {
  const { x1, x2, y1, y2 } = query;

  const data = await Store.find({})
    .populate({
      path: 'address',
      model: 'Address',
      match: {
        x: { $gt: x1, $lt: x2 },
        y: { $gt: y1, $lt: y2 },
      },
    })
    .populate({
      path: 'categoryId',
      model: 'Category',
    })
    .exec();

  // 수동으로 필터링
  const filteredData = data.filter((d) => d.address);

  console.log(filteredData.map((d) => d.address));
  // console.log(x1, x2, y1, y2);

  return filteredData;
};

exports.createAddress = async (body) => {
  const address = await Address.create(body);
  return address;
};
