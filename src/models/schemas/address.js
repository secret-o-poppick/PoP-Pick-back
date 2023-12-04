const { Schema } = require("mongoose");
const mongoose = require("mongoose");

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
    x: {
      // 32~39 정도
      type: Number,
      required: true,
    },
    y: {
      // 123~129 + 독도까지 131 정도
      type: Number,
      required: true,
    },
    store: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  {
    timestamps: true,
  }
);

module.exports = AddressSchema;
