const { Router } = require('express');
const router = Router();

console.log('API 라우터 올라옴');

const userRouter = require('./api/userAPI');
const adminRouter = require('./api/adminAPI');
const authRouter = require('./api/authAPI');
const storeRouter = require('./api/storeAPI');

const apiRouter = router //
  .use('/users', userRouter)
  .use('/admin', adminRouter)
  .use('/stores', storeRouter)
  .use('/auth', authRouter)
  .use('/', (req, res) => {
    res.json({ test: 'hi?' });
  });

module.exports = {
  apiRouter,
};
