const bodyParser = require('body-parser');
const compression = require('compression');
const { Server: server } = require('http');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('http-status-codes');

const { routing } = require('./routes');
const authMiddleware = require('./middlewares/auth');
const authenticate = require('./modules/auth');

require('./db/createConnection')();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use(helmet());
app.use(compression({ level: 6 }));

app.use(authMiddleware.initialize());

app.use('/', authenticate);

app.use(authMiddleware.authenticate('jwt', { session: false }));

routing(app);

app.use((req, res) => res.status(NOT_FOUND)
  .json({ message: `${req.method}: ${req.url} not found.` }));

app.use((err, req, res) => res.status(INTERNAL_SERVER_ERROR).send({ error: err.message }));


const http = server(app);

http.listen(process.env.PORT || 8081, (error) => {
  if (error) {
    console.error({ serverSuccessStarted: false, error });
  } else {
    console.log({ serverSuccessStarted: true });
  }
});

module.exports = {
  http, app,
};
