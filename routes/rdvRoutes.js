const express = require('express');
const router = express.Router();
const rdv = require('../models/rdvModel')
router.post('/bookNewRdv', rdv.BookNewRdv);
router.get('/available-pros', rdv.getAvailablePros);

module.exports = router;