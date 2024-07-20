const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.BookNewRdv = async (req, res) => {
    const { id_client, id_pro, service_id, date, time, address, description } = req.body;

    console.log('Données reçues dans le backend :', req.body);

    if (!date || !time) {
        return res.status(400).json({ message: 'La date et l\'heure doivent être fournies.' });
    }

    // Enregistrez le rendez-vous
    const insertQuery = 'INSERT INTO rdv (id_particulier, id_pro, service_id, date, time, address, description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    sqlConnection.query(insertQuery, [id_client, id_pro, service_id, date, time, address, description], (insertErr, insertResults) => {
        if (insertErr) {
            console.error('Erreur lors de l\'insertion du rendez-vous :', insertErr);
            return res.status(500).json({ message: insertErr.message });
        }
        console.log('Rendez-vous pris avec succès, ID :', insertResults.insertId);
        res.status(201).json({ message: 'Rendez-vous pris avec succès', rdvId: insertResults.insertId });
    });
}



  
  
  


exports.getRdv = async (req, res) => {
    const { date } = req.query;
    
    const query = `
        SELECT rdv.id, rdv.date, rdv.time, particuliers.nom AS client_name, particuliers.prenom AS client_prenom,
               pro.nom AS pro_name, pro.prenom AS pro_prenom, services.service_name
        FROM rdv
        JOIN particuliers ON rdv.id_particulier = particuliers.id
        JOIN pro ON rdv.id_pro = pro.id
        JOIN services ON rdv.service_id = services.id;
    `;
    
    sqlConnection.query(query, [date], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });

}

exports.getAvailablePros = async (req, res)=>{
    const { service_id, date, time } = req.query;

  const query = `
     SELECT pro.id, pro.nom, pro.prenom
    FROM pro
    JOIN pro_services ON pro.id = pro_services.pro_id
    JOIN services ON pro_services.service_id = services.id
    LEFT JOIN rdv ON pro.id = rdv.id_pro AND rdv.date = ? AND rdv.time = ?
    WHERE services.id = ? AND rdv.date IS NULL
    LIMIT 0, 25
  `;
  
  sqlConnection.query(query, [service_id, date, time], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
}

exports.getAppointmentsByProId = async (req, res) => {
    const { proId } = req.params;
    const query = `
      SELECT rdv.*, particuliers.nom AS clientName, services.service_name
      FROM rdv
      JOIN particuliers ON rdv.id_particulier = particuliers.id
      JOIN services ON rdv.service_id = services.id
      WHERE rdv.id_pro = ?
    `;
    sqlConnection.query(query, [proId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(results);
    });
  };

  exports.getAppointmentsByClientId = async (req, res) => {
    const { clientId } = req.params;
    const query = `
      SELECT rdv.*, pro.nom AS proName, services.service_name
      FROM rdv
      JOIN pro ON rdv.id_pro = pro.id
      JOIN services ON rdv.service_id = services.id
      WHERE rdv.id_particulier = ?
    `;
    sqlConnection.query(query, [clientId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(results);
    });
  };