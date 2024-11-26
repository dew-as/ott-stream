var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET all non-admin users */
router.get('/', async function (req, res, next) {
  try {
    // Find users where isAdmin is false
    const users = await User.find({ isAdmin: false });

    // Check if the result is empty
    if (!users || users.length === 0) {
      return res.status(404).send('No non-admin users found.');
    }

    // Render the 'users' view and pass the retrieved users
    res.render('users', { users: users });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


/* GET a user's watch history */
router.get('/watch-history/:id', async function (req, res, next) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send('User ID is required.');
  }

  try {
    const user = await User.findById(id).populate('watchHistory.movie');

    if (!user) {
      return res.status(404).send('User not found.');
    }
    console.log(user);

    res.render('user', { user: user });
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error.message);

    // Handle invalid ObjectId error separately
    if (error.kind === 'ObjectId') {
      return res.status(400).send('Invalid User ID format.');
    }

    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
