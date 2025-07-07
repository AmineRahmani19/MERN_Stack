router.post('/', async (req, res) => {
  const livre = new Livre(req.body);
  try {
    const newLivre = await livre.save();
    res.status(201).json(newLivre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
