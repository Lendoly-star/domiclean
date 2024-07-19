const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.userRegister  = async (userData) => {
    const { nom, prenom, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    let query = '';
    if (role === 'client') {
        query = 'INSERT INTO particuliers (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    } else if (role === 'pro') {
        query = 'INSERT INTO pro (nom, prenom, email, password) VALUES (?, ?, ?, ?)';
    } else {
        throw new Error('Rôle invalide');
    }

    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [nom, prenom, email, hashedPassword], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId, nom, prenom, email });
        });
    });
};

exports.userLogin = async ({ email, password }) => {
    const queryParticulier = 'SELECT * FROM particuliers WHERE email = ?';
    const queryPro = 'SELECT * FROM pro WHERE email = ?';

    return new Promise((resolve, reject) => {
        sqlConnection.query(queryParticulier, [email], async (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) {
                // Si l'utilisateur n'est pas trouvé dans la table particuliers, vérifier la table pro
                sqlConnection.query(queryPro, [email], async (err, result) => {
                    if (err) return reject(err);
                    if (result.length === 0) return reject(new Error('Utilisateur n\'existe pas'));

                    const user = result[0];
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) return reject(new Error('Invalid credentials'));

                    // Générer le token JWT en incluant le rôle 'pro'
                    const token = jwt.sign({ id: user.id, role: 'pro' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    resolve({ token });
                });
            } else {
                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return reject(new Error('Invalid credentials'));

                // Générer le token JWT en incluant le rôle 'client'
                const token = jwt.sign({ id: user.id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1h' });
                resolve({ token });
            }
        });
    });
}
