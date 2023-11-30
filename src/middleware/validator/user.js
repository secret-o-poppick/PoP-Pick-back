const Joi = require('joi');

const user = {
  login: {
    body: Joi.object().keys({
      email: Joi.string()
        .required()
        .email()
        .messages({
          email: {
            'any.required': '이메일을 입력해주세요.',
          },
        }),
      password: Joi.string()
        .required()
        .messages({
          password: {
            'any.required': '비밀번호를 입력해주세요.',
          },
        }),
    }),
  },
  post: {
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

module.exports = { user };
