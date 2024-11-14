var express = require('express');
var router = express.Router();

const users = [
  {
    id: 1, email: "john.doe@example.com", name: "John Doe", isBlocked: false, watchHistory: [
      { movieId: 1, movieName: "Inception", dateWatched: "2024-11-01 14:30:00" },
      { movieId: 2, movieName: "The Dark Knight", dateWatched: "2024-11-02 18:00:00" },
      { movieId: 3, movieName: "Interstellar", dateWatched: "2024-11-03 20:15:00" }
    ]
  },
  {
    id: 2, email: "jane.smith@example.com", name: "Jane Smith", isBlocked: true, watchHistory: [
      { movieId: 4, movieName: "Inception", dateWatched: "2024-11-01 14:30:00" },
      { movieId: 5, movieName: "The Dark Knight", dateWatched: "2024-11-02 18:00:00" },
      { movieId: 2, movieName: "Interstellar", dateWatched: "2024-11-03 20:15:00" }
    ]
  }
];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('users', { users: users });
});

/* GET users listing. */
router.get('/watch-history/:id', function (req, res, next) {
  res.render('user', { user: users[0] });
});

module.exports = router;
