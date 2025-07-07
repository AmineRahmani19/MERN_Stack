router.post('/', async (req, res) => {
  const pret = new Pret(req.body);
  try {
    const newPret = await pret.save();
    res.status(201).json(newPret);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
