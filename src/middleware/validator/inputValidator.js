const { SchemaNotFoundError, ValidationError } = require('../../utils/error');

const supportedMethods = ['post', 'put', 'patch', 'delete'];

const validationOptions = {
  // 유효성 검사 중 에러가 발생했을 때 즉시 중단할지 판단
  // true: 첫번째 에러를 반환
  // false: 모든 에러를 반환
  abortEarly: false,
  // 스키마에 정의되지 않은 속성이 데이터에 포함되면 에러를 발생할지 판단
  // false: 정의되지 않은키가 요청 데이터에 포함되면 에러를 발생
  // true: 정의되지 않은 키를 무시하고 검증을 함
  allowUnknown: false,
};

const inputValidator = (schema) => (req, res, next) => {
  try {
    if (!schema) {
      throw new SchemaNotFoundError('스키마가 존재하지 않습니다.');
    }
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.body.validate(req.body, validationOptions);

    if (error) {
      const opt = {
        original: error._original,
        details: error.details.map(({ message, context }) => ({
          key: context.key,
          message: message.replace(/['"]/g, ''),
          value: context.value,
        })),
      };

      throw new ValidationError(
        '요청받은 데이터의 유효성 검사에 실패했습니다.',
        400,
        'ValidationError',
        opt.details
      );
    }

    req.body = value;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { inputValidator };
