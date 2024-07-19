const UserModel = require('../models/particulierModel');

exports.userRegister = async (req, res) => {
    try {
        const user = await UserModel.userRegister(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.userLogin = async (req, res)=>{
    try {
        const {token} = await UserModel.userLogin(req.body);
        res.status(201).json({message: 'Connexion réussi', token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getUserInfo = async (req, res) => {
    try {
        // L'utilisateur est disponible dans req.user grâce au middleware authenticateJWT
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}