const addressService = require("../services/addressService");

exports.getAddresses = async (req, res, next) => {
  const addresses = await addressService.getAddressesByCoordinate(req.query);
  res.status(200).json(addresses);
};

exports.createAddress = async (req, res, next) => {
  const address = await addressService.createAddress(req.body);
  res.status(200).json(address);
};
