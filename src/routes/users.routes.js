const express = require('express');
const router = express.Router();

const User = require('../controllers/users.controller');

router.get('/', User.fetchUser);

router.post('/', User.doRegister);
router.post('/login', User.doLogin);
router.post('/login', User.doLoginJWT);

module.exports = router;