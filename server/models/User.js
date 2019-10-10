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
  googleId: String,
  token: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  // status: {
  //type: String,
  //enum: ["ACTIVE", "PENDING", "FROZEN"],
  //default: "PENDING"
  // },
  image: {
    path: String,
    name: String,

  },
  contact: {
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String
    }
  },
  address: {
    name: String,
    address: String,
    buildingNumber: Number,
    floor: Number,
    zipCode: Number,
    country: String,
    city: String
  },
  chart: [{
    type: Schema.Types.ObjectId,
    ref: "Products"
  }],
  purchases: [{
    type: Schema.Types.ObjectId,
    ref: "Products"
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: "Products"
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

const Users = mongoose.model('Users', userSchema);
module.exports = Users;