const express = require('express');

const { storePaginationQuery } = require('../../middlewares/listUtils');
const { preloadEntity } = require('../../middlewares/preloadEntities');
const { asyncErrorHandler } = require('../../helpers/common');

const UserLikes = require('../../models/UserLikes');

const {
  showEntity, listEntities, createEntity, updateEntity, deleteEntity,
} = require('./controller');


const router = express.Router({ mergeParams: true });

router.get('/', storePaginationQuery(), asyncErrorHandler(listEntities));
router.post('/', asyncErrorHandler(createEntity));

router.use('/:id', preloadEntity(UserLikes));

router.get('/:id', asyncErrorHandler(showEntity));
router.patch('/:id', asyncErrorHandler(updateEntity));
router.delete('/:id', asyncErrorHandler(deleteEntity));


module.exports = router;
