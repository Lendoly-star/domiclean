const ProModel = require('../models/proModel');

exports.proRegister = async (req, res) =>{
    try {
        const user = await ProModel.proRegister(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.proLogin = async (req, res)=>{
    try {
        const {token} = await ProModel.proLogin(req.body);
        res.status(201).json({message: 'Connexion réussi', token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}