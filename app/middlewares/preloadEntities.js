const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require('http-status-codes');
const { Types: { ObjectId } } = require('mongoose');

const preloadEntity = Model => async (req, res, next) => {
  const _id = req.params.id;
  if (_id) {
    if (!ObjectId.isValid(_id)) return res.status(UNPROCESSABLE_ENTITY).json('URL should contain object id');
    const entity = await Model.findById(_id);
    if (!entity) return res.status(NOT_FOUND).json(`${Model.modelName} ${_id} not found`);
    req.entity = entity;
  }
  return next();
};

module.exports = {
  preloadEntity,
};
