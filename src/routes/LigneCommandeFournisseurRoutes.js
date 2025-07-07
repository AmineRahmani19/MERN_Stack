router.post('/', async (req, res) => {
  const ligne = new LigneCommandeFournisseur(req.body);
  try {
    const newLigne = await ligne.save();
    res.status(201).json(newLigne);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
