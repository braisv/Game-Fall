const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  search: '',
  gamesFound: [],
  selectedGame: '',
  name: "",
  platform: [],
  release: "",
  genre: [],
  image: [],
  description: "",
  companies: [],
  screenshots: [],
  similars: [],
  price: {
    amount: "",
    discountInfo: {
      discount: "",
      dateFrom: Date,
      dateTo: Date
    },
    taxes: ""
  },
  category: {
    type: "",
    enum: ["New", "On sale", "Recommended"]
  },
  stock: {
    quantity: "",
    minQuantity: ""
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});





const Game = mongoose.model('Game', gameSchema);
module.exports = Game;