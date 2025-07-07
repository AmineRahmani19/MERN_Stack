router.post('/', async (req, res) => {
  const fournisseur = new Fournisseur(req.body);
  try {
    const newFournisseur = await fournisseur.save();
    res.status(201).json(newFournisseur);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
