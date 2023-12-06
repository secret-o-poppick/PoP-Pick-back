require('dotenv').config();
const axios = require('axios');
const NodeCache = require('node-cache');

const { AuthError, APIError } = require('../utils/error');
const {
  getUsersByUserSocialId,
  removeUserRefreshToken,
} = require('./userService');
const { User } = require('../models');
const {
  REACT_APP_KAKAO_REST_API_KEY,
  REACT_APP_KAKAO_REDIRECT_URI,
  REACT_APP_KAKAO_ADMIN_KEY,
  REACT_APP_KAKAO_CLIENT_SECRET,
  REACT_APP_KAKAO_NONCE_VALUE,
} = process.env;

const cache = new NodeCache();

// 카카오 로그인 페이지
exports.KakaoLoginPage = () => {
  const path = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${REACT_APP_KAKAO_REDIRECT_URI}&response_type=code&nonce=${REACT_APP_KAKAO_NONCE_VALUE}&prompt`;
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

  const user = await getUsersByUserSocialId(socialId, '카카오');
  if (!user) {
    const newUser = await User.create({
      email: kakaoUser.email,
      socialId,
      name: nickname,
      nickName: nickname,
      image: picture,
      sns: '카카오',
      refreshToken: kakao.refresh_token,
      refreshExpiresIn: kakao.refresh_token_expires_in,
    });

    return {
      accessToken: kakao.id_token,
      userId: newUser._id,
      role: newUser.role,
    };
  }

  await User.updateOne(
    { socialId, sns: '카카오' },
    {
      refreshToken: kakao.refresh_token,
      refreshExpiresIn: kakao.refresh_token_expires_in,
    }
  );
  return { accessToken: kakao.id_token, userId: user._id, role: user.role };
};

// 카카오 연결 끊기
exports.kakaoWithdrawal = async (_id) => {
  const user = await getUsersByUserSocialId(_id, '카카오');

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

  await removeUserRefreshToken(user.socialId, '카카오');

  return res.data;
};

// 카카오 로그아웃
exports.kakaoLogout = async (_id) => {
  const user = await getUsersByUserSocialId(_id, '카카오');

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

  await removeUserRefreshToken(user.socialId, '카카오');

  if (!res) {
    new APIError('로그아웃 실패');
  }

  return res.data;
};

// 카카오 공개키 목록
exports.kakaoJwks = async () => {
  // 캐시에서 JWKS를 가져오기 시도
  const cachedJWKS = cache.get('kakaoJWKS');

  if (cachedJWKS) {
    // 캐시에 저장된 JWKS가 있으면 반환
    return cachedJWKS;
  }

  try {
    // Kakao JWKS를 요청하여 가져오기
    const response = await axios.get(
      'https://kauth.kakao.com/.well-known/jwks.json'
    );
    const kakaoJWKS = response.data;

    // JWKS를 캐시에 저장 (일 1회 갱신)
    cache.set('kakaoJWKS', kakaoJWKS, 24 * 60 * 60); // 1일 동안 캐시 유지

    return kakaoJWKS;
  } catch (error) {
    console.error('Error fetching Kakao JWKS:', error);
    throw new APIError('카카오 공개키 목록 조회 에러');
  }
};

// 카카오 리프레시토큰
exports.kakaoRefreshTokens = async (token) => {
  const kakao = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'refresh_token',
      client_id: REACT_APP_KAKAO_REST_API_KEY,
      refresh_token: token,
      client_secret: REACT_APP_KAKAO_CLIENT_SECRET,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }
  );
  return kakao.data;
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
