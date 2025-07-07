router.post('/', async (req, res) => {
  const commande = new CommandeFournisseur(req.body);
  try {
    const newCommande = await commande.save();
    res.status(201).json(newCommande);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
