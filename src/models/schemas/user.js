const { Schema } = require('mongoose');

const UserSchema = new Schema(
  {
    socialId: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      required: true,
    },
    sns: {
      type: String,
      require: false,
    },
    image: {
      type: String,
      require: false,
    },
    nickName: {
      type: String,
      require: false,
    },
    businessNumber: {
      type: String,
      required: false,
    },
    businessNumberFlg: {
      type: Boolean,
      default: false,
      required: false,
    },
    role: {
      type: String,
      enum: ['관리자', '등록자', '일반'],
      default: '일반',
      required: true,
    },
    bookmark: {
      type: String,
      required: false,
    },
    likes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
