const Joi = require('joi');

const store = {
  postStore: {
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '팝업 또는 전시회 이름을 입력해주세요.',
          },
        }),
      category: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '분류 카테고리를 선택해주세요',
          },
        }),
      brandName: Joi.string()
        .required()
        .messages({
          brandName: {
            'any.required': '주최 브랜드명을 입력해주세요.',
          },
        }),
      role: Joi.string()
        .required()
        .messages({
          role: {
            'any.required': '권한을 선택해주세요.',
          },
        }),
    }),
  },

  updateStore: {
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          email: {
            'any.required': '이메일을 입력해주세요.',
          },
        }),
      name: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '이름을 입력해주세요.',
          },
        }),
      password: Joi.string()
        .required()
        .messages({
          password: {
            'any.required': '비밀번호를 입력해주세요.',
          },
        }),
      role: Joi.string()
        .required()
        .messages({
          role: {
            'any.required': '권한을 선택해주세요.',
          },
        }),
    }),
  },

  deleteStore: {
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          email: {
            'any.required': '이메일을 입력해주세요.',
          },
        }),
      name: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '이름을 입력해주세요.',
          },
        }),
      password: Joi.string()
        .required()
        .messages({
          password: {
            'any.required': '비밀번호를 입력해주세요.',
          },
        }),
      role: Joi.string()
        .required()
        .messages({
          role: {
            'any.required': '권한을 선택해주세요.',
          },
        }),
    }),
  },

  activeStore: {
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          email: {
            'any.required': '이메일을 입력해주세요.',
          },
        }),
      name: Joi.string()
        .required()
        .messages({
          name: {
            'any.required': '이름을 입력해주세요.',
          },
        }),
      password: Joi.string()
        .required()
        .messages({
          password: {
            'any.required': '비밀번호를 입력해주세요.',
          },
        }),
      role: Joi.string()
        .required()
        .messages({
          role: {
            'any.required': '권한을 선택해주세요.',
          },
        }),
    }),
  },
};

module.exports = { store };
