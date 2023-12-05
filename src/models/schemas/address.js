const { Schema } = require('mongoose');

const AddressSchema = new Schema(
  {
    zipCode: {
      type: Number,
      required: true,
    },
    detail1: {
      type: String,
      required: true,
    },
    detail2: {
      type: String,
      require: false,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AddressSchema;
