router.post('/', async (req, res) => {
  const amende = new Amende(req.body);
  try {
    const newAmende = await amende.save();
    res.status(201).json(newAmende);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
