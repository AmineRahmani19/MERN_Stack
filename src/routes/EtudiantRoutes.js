router.post('/', async (req, res) => {
  const etudiant = new Etudiant(req.body);
  try {
    const newEtudiant = await etudiant.save();
    res.status(201).json(newEtudiant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
