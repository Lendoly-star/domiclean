const express = require('express');
const router = express.Router();
const paiment = require('../models/paiementModel')
router.post('/paiement', paiment.paiementCard);

module.exports = router;
  