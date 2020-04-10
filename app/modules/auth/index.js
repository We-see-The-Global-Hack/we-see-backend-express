const express = require('express');
const {
  signup,
  login,
  checkAuth,
} = require('./controller');
const auth = require('../../middlewares/auth');
const { asyncErrorHandler } = require('../../helpers/common');


const router = express.Router();

router.post('/signup', asyncErrorHandler(signup));

router.post('/authenticate', auth.authenticate('local', { session: false }), asyncErrorHandler(login));

router.get('/checkAuth', auth.authenticate('jwt', { session: false }), asyncErrorHandler(checkAuth));

module.exports = router;
