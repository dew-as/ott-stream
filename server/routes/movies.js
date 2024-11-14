var express = require('express');
var router = express.Router();

const movies = [
    { title: 'Movie 1', id: 1, description: 'Description for Movie 1', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 10 },
    { title: 'Movie 2', id: 2, description: 'Description for Movie 2', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 20 },
    { title: 'Movie 3', id: 3, description: 'Description for Movie 3', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 15 },
    { title: 'Movie 4', id: 4, description: 'Description for Movie 4', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 8 },
    { title: 'Movie 5', id: 5, description: 'Description for Movie 5', thumbnailUrl: 'https://i.pinimg.com/736x/8f/48/9f/8f489f929d4807c38ddda67c23c979f1.jpg', videoUrl: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4', viewCount: 12 },
];

/* GET movie listing. */
router.get('/', function (req, res, next) {
    res.render('movies', { movies });
});

/* GET movie by ID. */
router.get('/movie/:id', function (req, res, next) {
    const movie = movies.find(m => m.id == req.params.id);
    res.render('movie', { movie });
});

/* ADD movie form. */
router.get('/add-movie', function (req, res, next) {
    res.render('movie-form', { movie: false });
});

/* Edit movie form by ID. */
router.get('/edit/:id', function (req, res, next) {
    const movie = movies.find(m => m.id == req.params.id);
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
