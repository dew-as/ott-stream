const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
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

// Admin Routes
router.post('/addmovie', verifyJWT, verifyAdmin, apiController.addMovie); // Add movie
router.put('/editmovie/:id', verifyJWT, verifyAdmin, apiController.editMovie); // Edit movie
router.delete('/deletemovie/:id', verifyJWT, verifyAdmin, apiController.deleteMovie); // Delete movie
router.get('/userlist', verifyJWT, verifyAdmin, apiController.getAllUsers); // Get list of users
router.get('/userhistory/:id', verifyJWT, verifyAdmin, apiController.getUserHistory); // Get specific user watch history
router.put('/blockuser/:id', verifyJWT, verifyAdmin, apiController.toggleBlockUser);
router.get('/report', verifyJWT, verifyAdmin, apiController.getMovieReport); // Generate report on movies

module.exports = router;