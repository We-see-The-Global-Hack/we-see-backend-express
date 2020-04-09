const aqp = require('api-query-params');

const APQ_OPTIONS = { projectionKey: 'select', skipKey: 'page' };

const preparePaginationQuery = (_sort = { createdAt: 'desc' }, lean = true) => async (req, res, next) => {
  const {
    filter = {}, skip: page = 1, limit = 10, sort = _sort,
  } = aqp(req.query, APQ_OPTIONS);
  req.pagination = {
    filter,
    options: {
      limit, sort, page, lean,
    },
  };
  next();
};

module.exports = {
  preparePaginationQuery,
};
