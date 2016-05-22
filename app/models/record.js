var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  kg: Number,
  date: String
});
var Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
