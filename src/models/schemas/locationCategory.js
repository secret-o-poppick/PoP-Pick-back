const { ObjectId } = require('mongodb');
const { Schema } = require('mongoose');

const LocationCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    ancestors: {
      type: [ObjectId],
      ref: 'LocationCategory',
    },
    parent: {
      type: ObjectId,
      ref: 'LocationCategory',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = LocationCategorySchema;
