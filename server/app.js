var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies')
var apiRoute = require('./routes/apiRoutes')
var adminRoute = require('./routes/adminRoutes')

const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const { verifyJWT, verifyAdmin } = require('./middleware/authMiddleware');
dotenv.config()
connectDB()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//layout setup
app.use(expressLayouts);

//cors configuration
const corsOptions = {
  origin: ['http://localhost:3000'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or credentials
};

app.use(cors(corsOptions));

app.set('layout', 'layouts/main-layout');

app.use('/', indexRouter);
app.use('/movies', verifyJWT, verifyAdmin, moviesRouter);
app.use('/users', usersRouter);
app.use('/api', apiRoute)
app.use('/admin', adminRoute)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
