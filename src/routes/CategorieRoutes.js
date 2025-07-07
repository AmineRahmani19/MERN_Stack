router.post('/', async (req, res) => {
  const categorie = new Categorie(req.body);
  try {
    const newCategorie = await categorie.save();
    res.status(201).json(newCategorie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
