const express = require('express');
const router = express.Router();
const userController = require('../controllers/particulierController');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000 ,// 1 min,
    max: 100,
    message: 'Too many request '
});

router.post('/register_user', userController.userRegister);
router.post('/login_user' , limiter, userController.userLogin);

module.exports = router;