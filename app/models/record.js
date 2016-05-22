var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new mongoose.Schema({
  kg: Number,
  created_at: {
    type: Date,
    required: true }
});
var Record = mongoose.model('Record', RecordSchema);
module.exports = Record;
