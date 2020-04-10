const { NO_CONTENT, CREATED } = require('http-status-codes');

const { paginationResponseWrapper } = require('../../helpers/common');
const Listings = require('../../models/Listings');


const listEntities = async (
  { pagination: { filter, options } }, res,
) => res.json(paginationResponseWrapper(await Listings.paginate({ ...filter }, options)));


const createEntity = async ({ body }, res) => {
  const entity = await Listings.create(body);
  return res.status(CREATED).json(entity);
};


const showEntity = async ({ entity }, res) => res.json(entity.toObject());


const updateEntity = async ({ entity, body }, res) => {
  Object.assign(entity, body);
  await entity.save();
  res.json(entity);
};


const deleteEntity = async ({ entity }, res) => {
  await entity.delete();
  res.status(NO_CONTENT).json({});
};

module.exports = {
  listEntities,
  showEntity,
  createEntity,
  updateEntity,
  deleteEntity,
};
