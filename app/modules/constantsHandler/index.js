const express = require('express');

const { CAUSES, TARGET_AUDIENCE } = require('../../constants/user');

const router = express.Router({ mergeParams: true });


router.get('/', (req, res) => res.json({
  users: {
    CAUSES,
    TARGET_AUDIENCE,
  },
}));

module.exports = router;
