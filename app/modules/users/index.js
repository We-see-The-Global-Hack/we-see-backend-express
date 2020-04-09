const express = require('express');

const { storePaginationQuery } = require('../../middlewares/listUtils');
const { asyncErrorHandler } = require('../../helpers/common');

const {
  get, list, create, update,
} = require('./controller');


const router = express.Router({ mergeParams: true });

router.get('/', storePaginationQuery(), asyncErrorHandler(list));
router.get('/:id', asyncErrorHandler(get));
router.post('/', asyncErrorHandler(create));
router.patch('/:id', asyncErrorHandler(update));


module.exports = router;
