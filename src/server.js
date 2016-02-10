var app, bodyParser, cookieParser, debug, dist, express, http, logger, path;
express = require("express");
http = require('http');

path = require("path");
logger = require("morgan");
cookieParser = require("cookie-parser");
bodyParser = require("body-parser");
debug = require("debug")("react-express-template");
require("babel/register");
dist = path.join(__dirname, '../dist');
app = express();

var React =require('react');
var SearchPage = React.createFactory(require(__dirname + '/components/searchPage'));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(dist));


app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../dist')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  var reactHtml = React.renderToString(SearchPage({}));
  res.render('index.ejs', {reactOutput: reactHtml});
});

app.get('/summoner', function(req, res) {
  res.render('client', { title: 'Express' });
});

app.use(function(req, res, next) {
  var err;
  err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.send({
    message: err.message
  });
});

var server = http.createServer(app);

server.listen(app.get("port"), function() {
return debug("Express server listening on port " + server.address().port);
});
