const { paginationResponseWrapper } = require('../../helpers/common');
const Users = require('../../models/Users');


const list = async (
  { pagination: { filter, options } }, res,
) => res.json(paginationResponseWrapper(await Users.paginate({ ...filter }, options)));

module.exports = { list };
