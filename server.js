var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//api routers
//router for display docs
const docRouter = require('./routes/api/docs');
//router for game
const gameRouter = require('./routes/api/games');
//router for user
const userRouter = require('./routes/api/users');
//router for reviews
const reviewRouter = require('./routes/api/reviews');
//router for arenas
const arenaRouter = require('./routes/api/arenas');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//api routes
//mount route for api docs
app.use('/api/docs', docRouter);
//mount route for game
app.use('/api/games', gameRouter);
//mount router for users
app.use('/api/users', userRouter);
// mount route for user review
app.use('/api/users', reviewRouter);
//mount router for arenas
app.use('/api/arenas', arenaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
