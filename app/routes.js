const dealConfirmations = require('./modules/dealConfirmations');
const userComments = require('./modules/userComments');
const listings = require('./modules/listings');
const userLikes = require('./modules/userLikes');
const users = require('./modules/users');
const constantsHandler = require('./modules/constantsHandler');

const routing = (app) => {
  app.use('/api/dealConfirmations', dealConfirmations);
  app.use('/api/listings', listings);
  app.use('/api/userComments', userComments);
  app.use('/api/userLikes', userLikes);
  app.use('/api/users', users);
  app.use('/api/constants', constantsHandler);
};

module.exports = { routing };
