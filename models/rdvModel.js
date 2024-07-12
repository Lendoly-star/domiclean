const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.GetAllRdv = async () =>{
    app.get('/api/rdv', (req, res) => {
        const query = 'SELECT * FROM appointments';
        sqlConnection.query(query, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });
}

exports.BookNewRdv = async ()=>{
    app.post('/api/rdv', (req, res) => {
        const { user_id, professional_id, date, service_type, description } = req.body;
        const query = 'INSERT INTO appointments (user_id, professional_id, date, service_type, description) VALUES (?, ?, ?, ?, ?)';
        sqlConnection.query(query, [user_id, professional_id, date, service_type, description], (err, result) => {
            if (err) throw err;
            res.status(201).send({ id: result.insertId, ...req.body });
        });
    });
}