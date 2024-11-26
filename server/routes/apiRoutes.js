const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const adminController = require('../controller/adminController')
const { verifyJWT, verifyAdmin } = require('../middleware/authMiddleware'); // Middleware for auth

// User Routes
router.post('/register', apiController.registerUser); // User registration
router.post('/login', apiController.loginUser); // User login
router.get('/movielist', verifyJWT, apiController.getMovies); // Get all movies
router.get('/singlemovie/:id', verifyJWT, apiController.getSingleMovie); // Get single movie details
router.post('/watchlist/:movieId', verifyJWT, apiController.toggleWatchlist); // Toggle movie in watchlist
router.get('/watchlist', verifyJWT, apiController.getWatchlist); // Get user watchlist
router.post('/watchhistory', verifyJWT, apiController.addToWatchHistory); // Add movie to watch history
router.get('/watchhistory', verifyJWT, apiController.getWatchHistory); // Get user watch history
router.put('/passwordchange', verifyJWT, apiController.changePassword); // Change password
router.post('/logout', verifyJWT, apiController.logoutUser); // Logout user

module.exports = router;