const asyncErrorHandler = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const paginationResponseWrapper = (response) => {
  const {
    limit, docs, total, page, pages,
  } = response;
  return {
    data: docs,
    meta: {
      total, limit, page, pages,
    },
  };
};


module.exports = {
  asyncErrorHandler,
  paginationResponseWrapper,
};
