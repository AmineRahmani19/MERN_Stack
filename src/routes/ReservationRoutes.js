router.post('/', async (req, res) => {
  const reservation = new Reservation(req.body);
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
