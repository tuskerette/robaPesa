var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeightSchema = new mongoose.Schema({
  kg: Number,
  created_at: Date
});
var Weight = mongoose.model('Weight', WeightSchema);
module.exports = Weight;
