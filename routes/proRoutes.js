const express = require('express');
const router = express.Router();
const proController = require('../controllers/proController');
const authenticateJWT = require('../middleware/jwt');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min,
    max: 100,
    message: 'Too many requests'
});

router.post('/addService', authenticateJWT, proController.addService);
router.post('/getServices', authenticateJWT, proController.getServices);
router.post('/getAllServices', authenticateJWT, proController.getAllServices);
router.post('/addAvailability', authenticateJWT, proController.addAvailability);
router.post('/getAvailabilities', authenticateJWT, proController.getAvailabilities);

module.exports = router;
