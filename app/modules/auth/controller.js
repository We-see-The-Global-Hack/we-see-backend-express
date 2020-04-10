const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('http-status-codes');

const Users = require('../../models/Users');

const signup = async (req, res) => {
  const {
    password: rawPassword, email, firstName, lastName,
  } = req.body;
  console.log('req', req.body)
  const password = await bcrypt.hash(rawPassword, parseInt(process.env.BCRYPT_ROUNDS, 10));
  const user = await Users.create({
    email, password, firstName, lastName,
  });
  return res.json({ status: 'authenticated', user: user.toObject() });
};

const login = async (req, res) => {
  if (!req.user) return res.status(UNAUTHORIZED).json({});
  return res.json({ user: req.user });
};


const checkAuth = async ({ user, header }, res) => res.json({
  user,
  exp: jwt.verify(header('Authorization').replace('Bearer ', ''), process.env.JWT_SECRET).exp,
});


module.exports = {
  signup,
  login,
  checkAuth,
};
