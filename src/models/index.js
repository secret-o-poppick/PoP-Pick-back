const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const StoreSchema = require("./schemas/store");
const LocationCategorySchema = require("./schemas/locationCategory");
const CategorySchema = require("./schemas/category");
const AddressSchema = require("./schemas/address");

exports.User = mongoose.model("User", UserSchema);
exports.Store = mongoose.model("Store", StoreSchema);
exports.LocationCategory = mongoose.model(
  "LocationCategory",
  LocationCategorySchema
);
exports.Category = mongoose.model("Category", CategorySchema);
exports.Address = mongoose.model("Address", AddressSchema);
