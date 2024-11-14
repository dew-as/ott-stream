var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

/* GET profile page. */
router.get('/profile', function(req, res, next) {
  res.render('profile');
});

module.exports = router;
