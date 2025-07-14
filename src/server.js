const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db'); // ✅ Connexion centralisée

// Import des routes
const categorieRoutes = require('./routes/CategorieRoutes');
const exemplaireRoutes= require('./routes/ExemplaireRoutes');
const pretRoutes = require('./routes/PretRoutes');
const amendeRoutes = require('./routes/AmendeRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');
const reservationRoutes = require('./routes/ReservationRoutes');
const commandeFournisseurRoutes = require('./routes/CommandeFournisseurRoutes');
const ligneCommandeFournisseurRoutes = require('./routes/LigneCommandeFournisseurRoutes');
const livreRoutes = require('./routes/LivreRoutes');
const utilisateurRoutes = require('./routes/UtilisateurRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// ✅ Middleware nécessaire pour lire le JSON envoyé par Postman
app.use(express.json());

// Enregistrement des routes
app.use('/api/categories', categorieRoutes);
app.use('/api/exemplaires', exemplaireRoutes);

app.use('/api/prets', pretRoutes);
app.use('/api/amendes', amendeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/commandes-fournisseur', commandeFournisseurRoutes);
app.use('/api/lignes-commande-fournisseur', ligneCommandeFournisseurRoutes);
app.use('/api/livres', livreRoutes);
app.use('/api/utilisateurs', utilisateurRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Bienvenue à l\'API de gestion de bibliothèque');
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
});
