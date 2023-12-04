const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

require('dotenv').config();
const { AuthError } = require('../utils/error');
const { kakaoJwks, kakaoRefreshTokens } = require('../services/kakaoService');
const {
  getUsersByUserSocialId,
  removeUserRefreshToken,
  updateUserRefreshToken,
} = require('../services/userService');
const { REACT_APP_KAKAO_REST_API_KEY, REACT_APP_KAKAO_NONCE_VALUE } =
  process.env;

const isAuth = async (req, res, next) => {
  try {
    const auth = req.headers['authorization'];
    const idToken = auth.split(' ')[1];
    if (!idToken) {
      throw new AuthError('권한이 없습니다.');
    }

    // 카카오 ID 토큰 유효성 검증하기
    // 1. ID 토큰의 영역 구분자인 온점(.)을 기준으로 헤더, 페이로드, 서명을 분리
    const [header, payload, signature] = idToken.split('.');

    // 2. 페이로드를 Base64 방식으로 디코딩
    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64').toString('utf-8')
    );

    // 3. 페이로드의 iss 값이 https://kauth.kakao.com와 일치하는지 확인
    // 4. 페이로드의 aud 값이 서비스 앱 키와 일치하는지 확인
    if (
      decodedPayload.iss !== 'https://kauth.kakao.com' ||
      decodedPayload.aud !== REACT_APP_KAKAO_REST_API_KEY
    ) {
      throw new AuthError('Invalid issuer or audience');
    }

    // 5. 페이로드의 exp 값이 현재 UNIX 타임스탬프(Timestamp)보다 큰 값인지 확인(ID 토큰이 만료되지 않았는지 확인)
    const decodedPayloadExp = new Date(decodedPayload.exp * 1000);
    const currentDate = new Date();
    // id토큰 유효기간 체크
    if (decodedPayloadExp < currentDate) {
      const user = await getUsersByUserSocialId(decodedPayload.sub, '카카오');

      const refreshToken = user.refreshToken;
      const refreshExpiresIn = user.refreshExpiresIn;
      if (!refreshToken || !refreshExpiresIn) {
        throw new AuthError('Invalid refresh token');
      }

      // 리프레시토큰 유효기간 체크
      const refreshExp = new Date(refreshExpiresIn * 1000);
      if (refreshExp < currentDate) {
        // 리프레시 토큰 지우기
        await removeUserRefreshToken(decodedPayload.sub, '카카오');
        throw new AuthError('Refresh token has expired');
      }

      const newTokens = await kakaoRefreshTokens(refreshToken);
      if (!newTokens || !newTokens.id_token) {
        throw new AuthError('Invalid refresh token');
      }

      // 리프레시토큰 갱신
      await updateUserRefreshToken(
        decodedPayload.sub,
        '카카오',
        newTokens.refresh_token,
        newTokens.refresh_token_expires_in
      );

      req.auth = decodedPayload;
      req.id_token = newTokens.id_token;
      next();
      return;
    }

    // 6. 페이로드의 nonce 값이 카카오 로그인 요청 시 전달한 값과 일치하는지 확인
    if (decodedPayload.nonce !== REACT_APP_KAKAO_NONCE_VALUE) {
      throw new AuthError('Invalid nonce value');
    }

    // 7. 서명 검증
    // 7-1. 헤더를 Base64 방식으로 디코딩
    const decodedHeader = JSON.parse(
      Buffer.from(header, 'base64').toString('utf-8')
    );

    // 7-2. OIDC: 공개키 목록 조회하기를 통해 카카오 인증 서버가 서명 시 사용하는 공개키 목록 조회
    const jwksResponse = await kakaoJwks();

    // 7-3. 공개키 목록에서 헤더의 kid에 해당하는 공개키 값 확인
    // - 공개키는 일정 기간 캐싱(Caching)하여 사용할 것을 권장하며, 지나치게 빈번한 요청 시 요청이 차단될 수 있으므로 유의
    const publicKey = jwksResponse.keys.find(
      (key) => key.kid === decodedHeader.kid
    );

    // 7-4. JWT 서명 검증을 지원하는 라이브러리를 사용해 공개키로 서명 검증
    // - 참고: OpenID Foundation, jwt.io
    // - 라이브러리를 사용하지 않고 직접 서명 검증 구현 시, RFC7515 규격에 따라 서명 검증 과정 진행 가능
    const isValidSignature = jwt.verify(idToken, jwkToPem(publicKey), {
      algorithms: ['RS256'],
    });

    if (!isValidSignature) {
      throw new AuthError('Unauthorized');
    }

    req.auth = isValidSignature;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { isAuth };
