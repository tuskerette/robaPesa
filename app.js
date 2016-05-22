var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Record = require('./app/models/record.js');

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

router.route('/records')
  .post(function(req, res) {
    var record = new Record({
      kg: req.body.kg,
      created_at: Date.now()
    });


    record.save(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: 'Entry recorded' });
      }
    });
  })
  .get(function(req, res) {
    Record.find(function(err, records) {
      if (err) {
        console.log(err);
      } else {
        res.json(records);
      }
    });
  });
  router.route('/records/:record_id')
  .get(function(req, res) {
    Record.findById(req.params.record_id, function(err, record) {
        if (err) {
          res.send(err);
        } else {
          res.json(record);
        }
    });
  })
  .put(function(req, res) {
    Record.findById(req.params.record_id, function(err, record) {
      if (err) {
        res.send(err);
      } else {
        record.kg = req.body.kg;
        record.updated_at = Date();
        record.save(function(err) {
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
    Record.remove({
      _id: req.params.record_id
    }, function(err, record) {
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
