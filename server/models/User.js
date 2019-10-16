const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  surname: String,
  // googleId: String,
  // token: {
  //   type: String,
  //   unique: true
  // },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  image: String,
  email: {
      type: String,
      unique: true
    },
  phone: String,

  address: {
    name: String,
    street: String,
    buildingNumber: Number,
    floor: Number,
    zipCode: Number,
    country: String,
    city: String
  },
  chart: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],
  purchases: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }],
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
      ret.id = doc._id
      delete ret._id
    }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;