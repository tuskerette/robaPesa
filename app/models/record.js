var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  date: String,
  kg: Number
});

module.export = mongoose.model('Record', RecordSchema);
