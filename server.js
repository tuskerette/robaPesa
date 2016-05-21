var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Record = require('./app/models/record');

mongoose.connect('mongodb://tuskerette:123456@ds011943.mlab.com:11943/roba-pesa');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.use(function(req, res, next) {
  console.log("brucey is cute");
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'it works' });
});

// REGISTER OUR ROUTES
// all the routes are prefixed with /api
app.use('/api', router);

app.listen(port);
console.log('Go to port ' + port);
