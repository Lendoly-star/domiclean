const express = require('express');
const router = express.Router();
const proController = require('../controllers/proController');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000 ,// 1 min,
    max: 100,
    message: 'Too many request '
});

router.post('/register_pro', proController.proRegister);
router.post('/login' , limiter, proController.proLogin);

module.exports = router;