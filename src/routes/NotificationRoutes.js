router.post('/', async (req, res) => {
  const notification = new Notification(req.body);
  try {
    const newNotif = await notification.save();
    res.status(201).json(newNotif);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
