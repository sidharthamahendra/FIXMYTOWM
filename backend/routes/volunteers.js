const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming all users are here

// GET /api/volunteers — fetch users with role 'Volunteer'
router.get('/', async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'Volunteer' }, '_id name');
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
