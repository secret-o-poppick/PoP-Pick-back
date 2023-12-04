const { ObjectId } = require("mongodb");
const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const StoreSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brandName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    locationId: {
      type: [ObjectId],
      required: true,
      ref: "LocationCategory",
    },
    images: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
      required: true,
    },
    adultVerification: {
      type: Boolean,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    socialLink: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    etc: {
      type: String,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = StoreSchema;
