var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var db = require('./db')(config);
var authentication = require('./middleware/authentication');
var authorization = require('./middleware/authorization');


var contactRouter = require('./routes/contact')(config);
var indexRouter = require('./routes/index')(config);
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product')(config);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contact',contactRouter);
app.use('/users', usersRouter);
app.use('/product',authentication,authorization,productRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = {
    status: 404,
    message:" Not Found "
  }
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  var status = err.status || 400;
  res.status(400).json({
    message:err.message || err
  });
});

app.listen(config.app.port, function(err,done){
   if(err){
   	console.log('err')
   }else{
   	console.log('service running at port '+ config.app.port)
   }
});

module.exports = app;
