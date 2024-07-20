const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');


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
};

exports.addService = async (req) => {
    const { proId, services } = req;
    console.log(proId);

    if (!proId || !services || services.length === 0) {
        return res.status(400).json({ message: 'ProId ou services manquants' });
    }
    console.log(proId);
    const query = 'INSERT INTO pro_services (pro_id, service_id) VALUES ?';
    const values = services.map(service => [proId, service]);

    return new Promise(() => {
        sqlConnection.query(query, [values], (err, result) => {
            if (err) return { message: err.message };
            return { message: 'Services ajoutés avec succès', result };
        });
    });
};

exports.getServices = async (proId) => {
    const query = 'SELECT * FROM pro_services WHERE pro_id = ?';

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [proId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getProServices = async (proId) => {
    const query = `
        SELECT services.id, services.service_name
        FROM services
        JOIN pro_services ON services.id = pro_services.service_id
        WHERE pro_services.pro_id = ?
    `;
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [proId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};



exports.getAllServices = async () => {
    const query = 'SELECT * FROM services';
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.addAvailability = async (proId, availabilities) => {
    const query = 'INSERT INTO pro_availabilities (pro_id, service_id, date, start_time, end_time) VALUES ?';
    const values = availabilities.map(slot => [proId, slot.serviceId, slot.date, slot.startTime, slot.endTime]);

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [values], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getAvailabilities = async (serviceId) => {
    const query = `
        SELECT pro.id, pro.nom, pro.prenom
        FROM pro
        JOIN pro_services ON pro.id = pro_services.pro_id
        WHERE pro_services.service_id = ?
    `;
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [serviceId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.getProsByService = async (serviceId) => {
    console.log(serviceId)
    const query = `
        SELECT pro.id, pro.nom, pro.prenom, pro_availabilities.date, pro_availabilities.start_time, pro_availabilities.end_time
        FROM pro
        JOIN pro_services ON pro.id = pro_services.pro_id
        JOIN pro_availabilities ON pro.id = pro_availabilities.pro_id
        WHERE pro_services.service_id = ?
    `;
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [serviceId], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// exports.getAvailablePros = async (serviceId) => {
//     const query = `
//         SELECT pro.id, pro.nom, pro.prenom
//         FROM pro
//         JOIN pro_services ON pro.id = pro_services.pro_id
//         WHERE pro_services.service_id = ?
//     `;
//     return new Promise((resolve, reject) => {
//         sqlConnection.query(query, [serviceId], (err, results) => {
//             if (err) return reject(err);
//             resolve(results);
//         });
//     });
// };
