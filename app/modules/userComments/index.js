const express = require('express');

const { preparePaginationQuery } = require('../../middlewares/listUtils');
const { preloadEntity } = require('../../middlewares/preloadEntities');
const { asyncErrorHandler } = require('../../helpers/common');

const UserComments = require('../../models/UserComments');

const {
  showEntity, listEntities, createEntity, updateEntity, deleteEntity,
} = require('./controller');


const router = express.Router({ mergeParams: true });

router.get('/', preparePaginationQuery(), asyncErrorHandler(listEntities));
router.post('/', asyncErrorHandler(createEntity));

router.use('/:id', preloadEntity(UserComments));

router.get('/:id', asyncErrorHandler(showEntity));
router.patch('/:id', asyncErrorHandler(updateEntity));
router.delete('/:id', asyncErrorHandler(deleteEntity));


module.exports = router;
