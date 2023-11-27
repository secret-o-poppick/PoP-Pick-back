const { Router } = require('express');
const router = Router();

const authController = require('../../controllers/authController');

/*
 * TODO : 데이터 검증 middleware 추가
 */

// 로그인
router.post('/', authController.login);

module.exports = router;
