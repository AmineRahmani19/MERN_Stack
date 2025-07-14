const Reservation = require('../models/Reservation');
const Utilisateur = require('../models/Utilisateur');

exports.createReservation = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.body.idUtilisateur);

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (utilisateur.role !== 'etudiant') {
      return res.status(400).json({ error: 'Seuls les étudiants peuvent faire des réservations.' });
    }

    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('idUtilisateur idExemplaire');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('idUtilisateur idExemplaire');
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
