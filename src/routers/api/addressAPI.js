const addressController = require("../../controllers/addressController");
const addressValidator = require("../../middleware/validator/address");
const { Router } = require("express");
const router = Router();

router.get(
  "/",
  addressValidator.coordinateValidator,
  addressController.getAddresses
);
router.post(
  "/",
  addressValidator.createValidator,
  addressController.createAddress
);

module.exports = router;
