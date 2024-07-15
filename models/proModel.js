const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.proRegister = async (userData) =>{
    const {nom, prenom, email, password} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO pro (nom, prenom, email, password) VALUES (?,?,?,?)`;
    return new Promise((resolve, reject)=>{
        sqlConnection.query(query, [nom, prenom, email, hashedPassword], (err, result)=>{
            if(err) return reject(err);
            resolve({id: result.insertId, nom, prenom, email})
        })
    })
}

exports.proLogin = async ({email, password})=>{
    const query = 'SELECT * FROM pro WHERE email =?';
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [email], async (err, result)=>{
            if(err) return reject(err);
            if(result.length === 0) return reject(new Error('Pro n\'existe pas'));
            const user = result[0]
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return reject(new Error('Invalid credentials'))

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            resolve({token})
        })
    })
}

exports.getServices = async (proId) => {
    const query = 'SELECT * FROM pro_services WHERE pro_id = ?';

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [proId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.addService = async (proId, services) => {
    const query = 'INSERT INTO pro_services (pro_id, service_name) VALUES ?';
    const values = services.map(service => [proId, service]);

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [values], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.addAvailability = async (proId, availability) => {
    const query = 'INSERT INTO pro_availabilities (pro_id, date, start_time, end_time) VALUES ?';
    const values = availability.map(slot => [proId, slot.date, slot.start_time, slot.end_time]);

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [values], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}