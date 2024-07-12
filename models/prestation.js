const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Particulier = require('./Particulier');
const Pro = require('./Pro');
const Schedule = require('./Schedule');

const Prestation = sequelize.define('Prestation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_particulier: {
        type: DataTypes.INTEGER,
        references: {
            model: Particulier,
            key: 'id'
        }
    },
    id_pro: {
        type: DataTypes.INTEGER,
        references: {
            model: Pro,
            key: 'id'
        }
    },
    type: DataTypes.STRING,
    id_schedule: {
        type: DataTypes.INTEGER,
        references: {
            model: Schedule,
            key: 'id'
        }
    }
});

module.exports = Prestation;
