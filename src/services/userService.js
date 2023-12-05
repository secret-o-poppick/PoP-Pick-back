const { AuthError, DuplicateError, APIError } = require('../utils/error.js');
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

// 회원 목록 조회
exports.getUsers = async (query) => {
  const { page = 1, perPage = 10, role } = query;
  const q = role ? { role } : {};

  const users = await User.find(q)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(Number(perPage))
    .select(
      '_id email name sns nickName businessNumber businessNumberFlg role createdAt updatedAt'
    );

  return users;
};

// 회원 상세 조회
exports.getUsersByUserId = async (userId) => {
  const user = await User.findById({ _id: userId })
    .select(
      '_id socialId email name sns nickName businessNumber businessNumberFlg role image createdAt updatedAt refreshToken refreshExpiresIn'
    )
    .exec();

  return user;
};

// 회원 상세 조회(소셜아이디로)
exports.getUsersByUserSocialId = async (socialId, sns) => {
  const user = await User.findOne({ socialId, sns })
    .select(
      '_id socialId email name sns nickName businessNumber businessNumberFlg role image createdAt updatedAt refreshToken refreshExpiresIn'
    )
    .exec();
  return user;
};

// 회원 리프레시 토큰 변경
exports.updateUserRefreshToken = async (
  socialId,
  sns,
  refreshToken,
  refreshExpiresIn
) => {
  const user = await User.findOneAndUpdate(
    { socialId, sns },
    { $set: { refreshToken, refreshExpiresIn } }
  );

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  return user;
};

// 회원 리프레시 토큰 삭제
exports.removeUserRefreshToken = async (socialId, sns) => {
  const user = await User.findOneAndUpdate(
    { socialId, sns },
    { $unset: { refreshToken: '', refreshExpiresIn: '' } }
  );

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  return user;
};

// 팝업스토어 목록 조회(북마크)
exports.getUserBookmarks = async (socialId, sns) => {
  const user = await User.findOne({ socialId, sns }).populate({
    path: 'bookmarks',
    populate: {
      path: 'categoryId',
    },
  });

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  return user.bookmarks ?? [];
};

// 팝업스토어 목록 조회 (좋아요)
exports.getUserLikes = async (socialId, sns) => {
  const user = await User.findOne({ socialId, sns }).populate({
    path: 'likes',
    populate: {
      path: 'categoryId',
    },
  });

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  return user.likes ?? [];
};
