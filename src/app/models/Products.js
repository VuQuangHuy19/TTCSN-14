const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
  id: ObjectId,
  addstart: String,
  datestart: Date,
  description: String,
  img: String,
  name: String,
  price: { type: Number, default: 0.0 },
  slot: { type: Number, default: 0 },
  timetrip: String, 
});

module.exports = mongoose.model('Product', Product);
