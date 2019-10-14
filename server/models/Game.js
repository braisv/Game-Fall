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
  price: "",
  category: {
    type: "",
    enum: ["New", "On sale", "Recommended"]
  },
  stock: "",
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});





const Game = mongoose.model('Game', gameSchema);
module.exports = Game;