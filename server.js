var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

// require('dotenv').config();
require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//api routers
const gameRouter = require('./routes/api/games');
const goalieRouter = require('./routes/api/goalies');
const requestorRouter = require('./routes/api/requestors');
const goalie_reviewRouter = require('./routes/api/goalie_review');
const requestor_reviewRouter = require('./routes/api/requestor_review')

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
app.use('/api/games', gameRouter);
app.use('/api/goalies', goalieRouter);
app.use('/api/goalies', goalie_reviewRouter);
app.use('/api/requestors', requestorRouter);
app.use('/api/requestors', requestor_reviewRouter);


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
