const { UNAUTHORIZED } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const Users = require('../models/Users');

const { JWT_SECRET } = process.env;

const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const user = await Users.findOne({ email: username });
      if (!user) return done({ status: UNAUTHORIZED, message: 'User is not authorised in the system' });
      if (!await bcrypt.compare(password, user.password)) {
        return done({ status: UNAUTHORIZED, message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
);

const jwt = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: JWT_SECRET,
  },
  async ({ id }, done) => {
    try {
      const user = await Users.findById(id);
      if (!user) return done({ status: UNAUTHORIZED, message: 'User does not exist in system' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
);

passport.use(local);
passport.use(jwt);

module.exports = passport;
