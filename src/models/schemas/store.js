const { ObjectId } = require('mongodb');
const { Schema } = require('mongoose');

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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    locationId: {
      type: [ObjectId],
      required: true,
      ref: 'LocationCategory',
    },
    images: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = StoreSchema;
