var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('controller', __dirname + '/controller/');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件地址
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// 设置控制器列表及响应路径
var controller = app.get('controller');
fs.readdirSync(controller).forEach(function (fileName) {
  var filePath = controller + fileName;
  var urlmodel = fileName.substr(0, fileName.lastIndexOf('.'));
  if (!fs.lstatSync(filePath).isDirectory()) {
    app.use('/', require(filePath));
    /*if (urlmodel === 'index') {
      // 默认路径, 如: /...
      app.use('/', require(filePath));
    } else {
      // 以文件名为第一级路径，如：/user/...
      app.use("/" + urlmodel, require(filePath));
    }*/
  }
});

// Log setting
if (!fs.existsSync(__dirname + "/log/"))
{
    fs.mkdir(__dirname + "/log/");
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//应用终止退出
/*
process.on('exit',function(){
 console.log('Exit...........');
});

//应用未Catch异常
process.on('uncaughtException', function (err) {
  console.log(err);
  log.write('error', err);
});
*/

module.exports = app;
