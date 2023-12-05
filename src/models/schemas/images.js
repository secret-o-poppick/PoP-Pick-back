const { Schema } = require('mongoose');

const ImageSchema = new Schema(
  {
    isMain: {
      type: Boolean,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ImageSchema;
