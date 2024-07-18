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
        console.log(req.body);
        const {token} = await ProModel.addService(req.body);
        console.log('ok');
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

exports.getProServices = async (req, res) => {
    try {
        const proId = req.user.id; // Utilise l'ID extrait du token
        const services = await ProModel.getProServices(proId);
        res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addAvailability = async (req, res) => {
    try {
        const proId = req.user.id; // Utilise l'ID extrait du token
        const { availabilities } = req.body;

        if (!Array.isArray(availabilities) || availabilities.length === 0) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of availabilities.' });
        }

        const result = await ProModel.addAvailability(proId, availabilities);
        res.status(201).json({ message: 'Disponibilité ajoutée', result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getAvailabilities = async (req, res)=>{
    try {
        const { serviceId } = req.query;
        const pros = await ProModel.getAvailablePros(serviceId);
        res.status(200).json(pros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getProsByService = async (req, res) => {
    try {
        const { serviceId } = req.query;
        const pros = await ProModel.getProsByService(serviceId);
        res.status(200).json(pros);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// exports.getAvailablePros = async (req, res) => {
//     try {
//         const { serviceId } = req.query;
//         const pros = await ProModel.getAvailablePros(serviceId);
//         res.status(200).json(pros);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
