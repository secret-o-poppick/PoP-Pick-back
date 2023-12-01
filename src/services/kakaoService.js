require('dotenv').config();
const axios = require('axios');
const { AuthError, APIError } = require('../utils/error');
const { createAccessToken } = require('../utils/index');
const { getUsersByUserSocialId, getUsersByUserId } = require('./userService');
const {
  REACT_APP_KAKAO_REST_API_KEY,
  REACT_APP_KAKAO_REDIRECT_URI,
  REACT_APP_KAKAO_ADMIN_KEY,
  REACT_APP_KAKAO_CLIENT_SECRET,
} = process.env;

// 카카오 로그인 페이지
exports.KakaoLoginPage = () => {
  const path = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code&prompt`;
  return { path };
};

// 카카오 로그인
exports.kakaoLogin = async (body) => {
  const { authorizationCode } = body;

  // 카카오 토큰 정보
  const kakao = await getKakaoToken(authorizationCode);

  // 카카오 로그인 유저 정보
  const kakaoUser = await getKakaoUserInfo(kakao.access_token);

  const { sub: socialId, nickname, picture } = kakaoUser;

  const user = await getUsersByUserSocialId(socialId);
  if (!user) {
    const newUser = await User.create({
      socialId,
      name: nickname,
      nickName: nickname,
      image: picture,
      sns: '카카오',
    });

    const accessToken = createAccessToken({
      _id: newUser._id,
      role: newUser.role,
    });

    return { accessToken, userId: user._id, role: user.role };
  }

  const accessToken = createAccessToken({
    _id: user._id,
    role: user.role,
  });

  return { accessToken, userId: user._id, role: user.role };
};

// 카카오 연결 끊기
exports.kakaoWithdrawal = async (_id) => {
  const user = await getUsersByUserId(_id);

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  const res = await axios.post(
    'https://kapi.kakao.com/v1/user/unlink',
    {
      target_id_type: 'user_id',
      target_id: user.socialId,
    },
    {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_ADMIN_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!res) {
    new APIError('연결끊기 실패');
  }

  return res.data;
};

// 카카오 로그아웃
exports.kakaoLogout = async (_id) => {
  const user = await getUsersByUserId(_id);

  if (!user) {
    new APIError('유저가 존재하지 않습니다.');
  }

  const res = await axios.post(
    `https://kapi.kakao.com/v1/user/logout`,
    {
      target_id_type: 'user_id',
      target_id: user.socialId,
    },
    {
      headers: {
        Authorization: `KakaoAK ${REACT_APP_KAKAO_ADMIN_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  if (!res) {
    new APIError('로그아웃 실패');
  }

  return res.data;
};

// 카카오 토큰 받기
const getKakaoToken = async (code) => {
  const kakao = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: REACT_APP_KAKAO_REST_API_KEY,
      redirect_uri: REACT_APP_KAKAO_REDIRECT_URI,
      code,
      client_secret: REACT_APP_KAKAO_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return kakao.data;
};

// 카카오 유저 정보 받기
const getKakaoUserInfo = async (token) => {
  const user = await axios.get('https://kapi.kakao.com/v1/oidc/userinfo', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!user) {
    throw new AuthError('로그인 정보가 존재하지 않습니다.');
  }

  return user.data;
};
