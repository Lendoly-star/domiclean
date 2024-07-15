const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.BookNewRdv = async (req, res) =>{
    const { id_client, id_pro, service_id, date, time, address, description } = req.body;
  
    const query = 'INSERT INTO rdv (id_client, id_pro, service_id, date, time, address, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    sqlConnection.query(query, [id_client, id_pro, service_id, date, time, address, description], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: 'Rendez-vous pris avec succès' });
    });
}

exports.getAvailablePros = async (req, res)=>{
    const { service_id, date, time } = req.query;

  const query = `
    SELECT pro.id, pro.nom, pro.prenom
    FROM pro
    LEFT JOIN rdv ON pro.id = rdv.id_pro
    WHERE pro.service_id = ? AND (rdv.date IS NULL OR rdv.date != ? OR rdv.time != ?)
  `;
  
  sqlConnection.query(query, [service_id, date, time], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
}