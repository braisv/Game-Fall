const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  platform: String,
  release: String,
  genre: [],
  // score: Number,
  image: String,
  description: String,
  // developer: String,
  // publisher: [],
  // rating: String,
  // price: {
  //   amount: Number,
  //   discountInfo: {
  //      discount: Number,
  //      dateFrom: Date,
  //      dateTo: Date
  //   },
  //   taxes: Number
  // },
  // category: {
  //   type: String,
  //   enum: ["New", "On sale", "Recommended"]
  // },
  // stock: {
  //   quantity: Number,
  //   minQuantity: Number,
  //   releaseDate: Date
  // }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});





const Game = mongoose.model('Game', gameSchema);
module.exports = Game;