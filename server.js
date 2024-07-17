const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { APIToolkit } = require('apitoolkit-express'); // Modifier ici
const authMiddleware = require('./middleware/jwt');;

const mongoConnect = require('./config/mongo');
const { mysqlConnect } = require('./config/db');

const userRoutes = require('./routes/particuliersRoutes');
const proRoutes = require('./routes/proRoutes');
const paiementRoutes = require('./routes/paiementRoutes');
const rdvRoutes = require('./routes/rdvRoutes');

const app = express();
const port = process.env.PORT || 4000;

const apitoolkitClient = APIToolkit.NewClient({ apiKey: "k/QaKs1OPSkzmoVL0qZsTWhH9DieHNGe7r7qh+1eoDFb/NzP" });
app.use(apitoolkitClient.expressMiddleware);

app.use(bodyParser.json());
app.use(cors());

mongoConnect();
mysqlConnect();

app.use('/api/user', userRoutes);
app.use('/api/pro' ,proRoutes);
app.use('/api/ticket', paiementRoutes);
app.use('/api/rdv', rdvRoutes);

app.listen(port, () => {
    console.log(`Serveur running on port ${port}`);
});
