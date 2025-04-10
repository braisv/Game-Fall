const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    platform: [{ type: String }],
    release: String,
    genre: [{ type: String }],
    image: [{ type: String }],
    description: String,
    companies: [{ type: String }],
    screenshots: [{ type: String }],
    similars: [{ type: String }],
    price: Number,
    amount: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      enum: ["New", "On sale", "Recommended"],
      default: "On sale",
    },
    stock: Number,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
