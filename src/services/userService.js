const { AuthError, DuplicateError } = require('../utils/error.js');
const { User } = require('../models/index');

const {
  hashPassword,
  comparePassword,
  createAccessToken,
} = require('../utils/index');

// 회원 등록
exports.createUser = async (body) => {
  const { email, password, name, role } = body;

  const existsUser = await User.findOne({ email }).exec();
  if (existsUser) {
    throw new DuplicateError('이메일이 이미 존재합니다.');
  }

  const hashedPassword = hashPassword(password);
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
    role,
  });

  const accessToken = createAccessToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  return { accessToken, userId: user._id, role: user.role };
};

// 관리자 로그인
exports.adminLogin = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({
    email,
  }).exec();

  if (!user || !comparePassword(password, user.password)) {
    throw new AuthError('이메일 또는 비밀번호를 확인해주세요.');
  }

  const accessToken = createAccessToken({
    _id: user._id,
    email: user.email,
    role: user.role,
  });

  return { accessToken, userId: user._id, role: user.role };
};
