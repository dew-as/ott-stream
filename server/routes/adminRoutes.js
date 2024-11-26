const express = require('express');
const router = express.Router();
const apiController = require('../controller/apiController');
const adminController = require('../controller/adminController')
const { verifyJWT, verifyAdmin } = require('../middleware/authMiddleware'); // Middleware for auth

// Admin Routes
router.post('/login', adminController.loginAdmin); // User login
router.get('/movielist', verifyJWT, apiController.getMovies); // Get all movies
router.get('/singlemovie/:id', verifyJWT, apiController.getSingleMovie); // Get single movie details
router.post('/addmovie', verifyJWT, verifyAdmin, adminController.addMovie); // Add movie
router.put('/editmovie/:id', verifyJWT, verifyAdmin, adminController.editMovie); // Edit movie
router.delete('/deletemovie/:id', verifyJWT, verifyAdmin, adminController.deleteMovie); // Delete movie
router.get('/userlist', verifyJWT, verifyAdmin, adminController.getAllUsers); // Get list of users
router.get('/userhistory/:id', verifyJWT, verifyAdmin, adminController.getUserHistory); // Get specific user watch history
router.put('/blockuser/:id', verifyJWT, verifyAdmin, adminController.toggleBlockUser);
router.get('/report', verifyJWT, verifyAdmin, adminController.getMovieReport); // Generate report on movies
router.post('/passwordchange', verifyJWT, apiController.changePassword); // Change password
router.post('/logout', verifyJWT, apiController.logoutUser); // Logout user

module.exports = router;