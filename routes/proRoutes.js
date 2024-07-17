const express = require('express');
const router = express.Router();
const proController = require('../controllers/proController');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min,
    max: 100,
    message: 'Too many requests'
});

router.post('/addService', proController.addService);
router.post('/getServices', proController.getServices);
router.post('/getAllServices', proController.getAllServices);
router.post('/addAvailability', proController.addAvailability);
router.post('/getAvailabilities', proController.getAvailabilities);

module.exports = router;
