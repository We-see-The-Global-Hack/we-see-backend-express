const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, PRECONDITION_FAILED } = require('http-status-codes');
const uuidv4 = require('uuid/v4');

const Users = require('../../models/Users');

const signup = async (req, res) => {
  const {
    password: rawPassword, email, firstName, lastName,
  } = req.body;
  const existedUser = await Users.findOne({ email });
  if (existedUser) return res.status(PRECONDITION_FAILED).json({ message: 'User already exists' });
  const password = await bcrypt.hash(rawPassword, parseInt(process.env.BCRYPT_ROUNDS, 10));
  const user = await Users.create({
    email, password, firstName, lastName,
  });
  return res.json({ status: 'authenticated', user: user.toObject() });
};

const login = async (req, res) => {
  if (!req.user) return res.status(UNAUTHORIZED).json({});
  const token = jwt.sign(
    {
      id: req.user._id,
      jti: uuidv4,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION_TIME },
  );
  return res.json({ user: req.user, token });
};


const checkAuth = async (req, res) => res.json({
  user: req.user,
  exp: jwt.verify(req.header('Authorization').replace('Bearer ', ''), process.env.JWT_SECRET).exp,
});


module.exports = {
  signup,
  login,
  checkAuth,
};
