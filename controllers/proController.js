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

exports.addService = async (req, res)=>{
    try {
        const {token} = await ProModel.addService(req.body);
        res.status(201).json({token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getServices = async (req, res)=>{
    try {
        const {token} = await ProModel.getServices(req.body);
        res.status(201).json({message: 'Service récupéré', token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const services = await ProModel.getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addAvailability = async (req, res)=>{
    try {
        const {token} = await ProModel.addAvailability(req.body);
        res.status(201).json({message: 'Horaire perso ajouté', token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getAvailabilities = async (req, res)=>{
    try {
        const {token} = await ProModel.getAvailabilities(req.body);
        res.status(201).json({message: 'Horaire bien récupéré', token}) 
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

