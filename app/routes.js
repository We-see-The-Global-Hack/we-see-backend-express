const dealConfirmations = require('./modules/dealConfirmations');
const userComments = require('./modules/userComments');
const listings = require('./modules/listings');
const userLikes = require('./modules/userLikes');
const userListings = require('./modules/userListings');
const users = require('./modules/users');

const routing = (app) => {
  app.use('/dealConfirmations', dealConfirmations);
  app.use('/listings', listings);
  app.use('/userComments', userComments);
  app.use('/userLikes', userLikes);
  app.use('/userListings', userListings);
  app.use('/users', users);
};

module.exports = { routing };
