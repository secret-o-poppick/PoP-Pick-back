const Joi = require('joi');

const category = {
  post: {
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '카테고리명을 입력해주세요.',
          },
        }),
    }),
  },
  put: {
    body: Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '카테고리명을 입력해주세요.',
          },
        }),
    }),
  },
};

module.exports = { category };
