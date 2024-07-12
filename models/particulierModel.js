const bcrypt = require('bcrypt');
const { sqlConnection } = require('../config/db');
const jwt = require('jsonwebtoken');

exports.userRegister = async (userData) =>{
    const {nom, prenom, email, password} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO particuliers (nom, prenom, email, password) VALUES (?,?,?,?)`;
    return new Promise((resolve, reject)=>{
        sqlConnection.query(query, [nom, prenom, email, hashedPassword], (err, result)=>{
            if(err) return reject(err);
            resolve({id: result.insertId, nom, prenom, email})
        })
    })
}

exports.userLogin = async ({email, password})=>{
    const query = 'SELECT * FROM particuliers WHERE email =?';
    return new Promise((resolve, reject) => {
        sqlConnection.query(query, [email], async (err, result)=>{
            if(err) return reject(err);
            if(result.length === 0) return reject(new Error('Particuliers n\'existe pas'));
            const user = result[0]
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return reject(new Error('Invalid credentials'))

            const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
            resolve({token})
        })
    })
}