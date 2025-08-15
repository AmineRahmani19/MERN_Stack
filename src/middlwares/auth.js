const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Vérifie si le header est présent et commence par 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token manquant ou mal formaté" });
  }

  const token = authHeader.split(' ')[1]; // Récupère uniquement le token

  jwt.verify(token, process.env.JWT_SECRET, (err, utilisateur) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    req.utilisateur = utilisateur; // ajoute les infos du token dans la requête
    next();
  });
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.utilisateur || !roles.includes(req.utilisateur.role)) {
      return res.status(403).json({ message: "Accès interdit" });
    }
    next();
  };
};
