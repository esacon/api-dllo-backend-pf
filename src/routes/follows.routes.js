const express = require('express');
const router = express.Router();

const Follow = require('../controllers/follows.controller');
const { validateToken } = require('../middleware/auth.middleware');

router.get('/followers', validateToken, Follow.fetchFollowers);
router.get('/following', validateToken, Follow.fetchFollowing);
router.post('/request', validateToken, Follow.requestUser);
router.post('/response', validateToken, Follow.responseUser);

module.exports = router;