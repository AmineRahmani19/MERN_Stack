router.post('/', async (req, res) => {
  const exemplaire = new Exemplaire(req.body);
  try {
    const newExemplaire = await exemplaire.save();
    res.status(201).json(newExemplaire);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
