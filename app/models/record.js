var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  kg: Number
});
var Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
