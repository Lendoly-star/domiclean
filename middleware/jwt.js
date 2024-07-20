const jwt = require('jsonwebtoken');
const { sqlConnection } = require('../config/db');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json('Token is not valid');
      }

      let query = '';
      if (user.role === 'client') {
        query = 'SELECT id, nom, prenom, email, "client" AS role FROM particuliers WHERE id = ?';
      } else if (user.role === 'pro') {
        query = 'SELECT id, nom, prenom, email, "pro" AS role FROM pro WHERE id = ?';
      } else {
        return res.status(400).json('Rôle invalide');
      }

      sqlConnection.query(query, [user.id], (err, result) => {
        if (err || result.length === 0) {
          return res.status(404).json('User not found');
        }

        req.user = result[0];
        next();
      });
    });
  } else {
    res.status(401).json('Authorization header is missing');
  }
};

module.exports = authenticateJWT;