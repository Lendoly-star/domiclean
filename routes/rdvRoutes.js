const express = require('express');
const router = express.Router();
const rdv = require('../models/rdvModel')
router.post('/bookNewRdv', rdv.BookNewRdv);
router.post('/pro/:proId', rdv.getAppointmentsByProId);
router.post('/client/:clientId', rdv.getAppointmentsByClientId);
router.post('/getRdv', rdv.getRdv);
router.post('/available-pros', rdv.getAvailablePros);

module.exports = router;