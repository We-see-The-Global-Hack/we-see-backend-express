const mongoose = require('mongoose');
require('./app');

process.on('SIGINT', () => {
  console.log('SIGINT signal received.');
  mongoose.connection.close(() => {
    console.error('Mongoose connection disconnected');
    process.exit(0);
  });
});
