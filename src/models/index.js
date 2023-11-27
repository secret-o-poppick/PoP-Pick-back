const mongoose = require('mongoose');

const UserSchema = require('./schemas/user');
const StoreSchema = require('./schemas/store');
const LocationCategorySchema = require('./schemas/locationCategory');
const CategorySchema = require('./schemas/category');

exports.User = mongoose.model('User', UserSchema);
exports.Store = mongoose.model('Store', StoreSchema);
exports.LocationCategory = mongoose.model(
  'LocationCategory',
  LocationCategorySchema
);
exports.Category = mongoose.model('Category', CategorySchema);
