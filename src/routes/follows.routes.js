const express = require('express');
const router = express.Router();

const Follow = require('../controllers/follows.controller');

router.get('/followers', Follow.fetchFollowers);
router.get('/following', Follow.fetchFollowing);
router.post('/request', Follow.requestUser);
router.post('/response', Follow.responseUser);

module.exports = router;