var express = require('express');
var router = express.Router();
const axios = require('axios');
const Movie = require('../models/Movie');

const movies = [
    { title: 'Movie 1', id: 1, description: 'Description for Movie 1', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10 },
    { title: 'Movie 2', id: 2, description: 'Description for Movie 2', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20 },
    { title: 'Movie 3', id: 3, description: 'Description for Movie 3', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15 },
    { title: 'Movie 4', id: 4, description: 'Description for Movie 4', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 8 },
    { title: 'Movie 5', id: 5, description: 'Description for Movie 5', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 12 },
];

/* GET movie listing. */
router.get('/', async function (req, res, next) {
    try {
        console.log('hai');
        const movies = await Movie.find();
        res.render('movies', { movies });
    } catch (error) {
        console.log(error);
    }
});

/* GET movie by ID and render EJS file */
router.get('/movie/:id', async function (req, res, next) {
    const { id } = req.params;
    try {
        // Fetch the movie details from the database
        const movie = await Movie.findById(id);

        if (!movie) {
            // If the movie is not found, render an error page or show a 404 message
            return res.status(404).render('error', { message: 'Movie not found', error: {} });
        }

        // Render the EJS file and pass the movie data
        res.render('movie', { movie });
    } catch (error) {
        console.error('Error fetching movie details:', error);
        // Render an error page if there's an issue fetching movie details
        res.status(500).render('error', { message: 'Failed to load movie details', error });
    }
});


/* ADD movie form. */
router.get('/add-movie', function (req, res, next) {
    res.render('movie-form', { movie: false });
});

/* Edit movie form by ID. */
router.get('/edit/:id', async function (req, res, next) {
    const { id } = req.params
    const movie = await Movie.findById(id)
    console.log(movie);
    res.render('movie-form', { movie });
});

/* Delete movie by ID. */
router.get('/delete/:id', function (req, res, next) {
    res.send('Movie deleted');
});

/* Report by view count. */
router.get('/report', function (req, res, next) {
    res.render('viewCount', { movies });
});

module.exports = router;
