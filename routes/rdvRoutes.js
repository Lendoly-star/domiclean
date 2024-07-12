const express = require('express');
const router = express.Router();
const rdv = require('../models/rdvModel')
router.post('/rdv', rdv.GetAllRdv);
router.post('/bookNewRdv', rdv.BookNewRdv);

module.exports = router;