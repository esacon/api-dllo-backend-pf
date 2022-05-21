const express = require('express');
const router = express.Router();

const Follow = require('../controllers/follows.controller');

router.get('/following', Follow.fetchCart);
router.get('/followers', Follow.fetchCart);   

router.post('/request', Follow.addToCart);
router.post('/response', Follow.buyCart);

module.exports = router;