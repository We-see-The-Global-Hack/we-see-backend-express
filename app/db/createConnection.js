const mongoose = require('mongoose');

const options = {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: 30,
  reconnectInterval: 500,
  poolSize: Number(process.env.DB_POOLSIZE) || 5,
  socketTimeoutMS: 30000,
};

mongoose.connection.on('connected', () => console.log(`Mongoose connected to ${process.env.DB_URI}, poolSize: ${process.env.DB_POOLSIZE}`));

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

let isConnected;

module.exports = async () => {
  let db;
  try {
    db = isConnected || await mongoose.connect(process.env.DB_URI, options);
    isConnected = db.connections[0].readyState;
    console.log(`Successfully connected to ${process.env.DB_URI}`);
  } catch (err) {
    console.error(`Connect failed to database: ${process.env.DB_URI} (${err})`);
  }
  return db;
};
