var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Weight = require('./app/models/weight.js');

mongoose.connect('mongodb://tuskerette:123456@ds011943.mlab.com:11943/roba-pesa');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR API
var router = express.Router();

router.use(function(req, res, next) {
  console.log("brucey is cute");
  next();
});

router.route('/weights')
  .post(function(req, res) {
    var weight = new Weight({
      kg: req.body.kg,
      created_at: Date.now()
    });


    weight.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: 'Entry recorded' });
      }
    });
  })
  .get(function(req, res) {
    Weight.find(function(err, weights) {
      if (err) {
        console.log(err);
      } else {
        res.json(weights);
      }
    });
  });
  router.route('/weights/:weight_id')
  .get(function(req, res) {
    Weight.findById(req.params.weight_id, function(err, weight) {
        if (err) {
          res.send(err);
        } else {
          res.json(weight);
        }
    });
  })
  .put(function(req, res) {
    Weight.findById(req.params.weight_id, function(err, weight) {
      if (err) {
        res.send(err);
      } else {
        weight.kg = req.body.kg;
        weight.save(function(err) {
          if (err) {
            res.send(err);
          } else {
            res.json({ message: 'Entry updated' });
          }
        })

      }
    });
  })
  .delete(function(req, res) {
    Weight.remove({
      _id: req.params.weight_id
    }, function(err, weight) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Successfully deleted' });
      }
    })
  })


// REGISTER ROUTES
app.use('/api', router);

var server = app.listen(8080, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('The server is up and listening at http://%s:%s', host, port);
});
