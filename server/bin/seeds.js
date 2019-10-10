require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Game = require("../models/Game");

const bcryptSalt = 10;

mongoose
  .connect(process.env.DBURL, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


let idJulio = require("mongoose").Types.ObjectId();
let idNatalia = require("mongoose").Types.ObjectId();
let idGame = require("mongoose").Types.ObjectId();
// Hay que añadir un token + username que permita loquearse en el chat
let users = [
  {
    _id: idJulio,
    username: 'Julius',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: 'Julio',
    surname: 'Huertas',
    email: 'huertasjulius@galiciamail.com',
    phone: 0034643235632,
    zipCode: 36210,
    country: 'Galicia',
    city: 'Vigo'
  },
  {
    _id: idNatalia,
    username: 'Natis',
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    name: 'Natalia',
    surname: 'Garea',
    email: 'gareusnatus@galiciamail.com',
    phone: 0034643235633,
    zipCode: 36210,
    country: 'Galicia',
    city: 'Vigo'
  }
];

let games = [
  {
    genre: [
      "RPG"
    ],
    _id: idGame,
    name: "Dragon Quest XIII",
    platform: "Nintendo Switch",
    release: "12/5/2018",
    image: "//images.igdb.com/igdb/image/upload/t_cover_big_2x/p5ixuaseeqhge5joabjf.jpg",
    description: "Set in the fantasy land of Hyrule, the plot centers on a boy named Link, the playable protagonist, who aims to collect the eight fragments of the Triforce of Wisdom in order to rescue Princess Zelda from the antagonist, Ganon. During the course of the game, the player sees Link from a top-down perspective and must navigate him through the overworld and several dungeons, defeating enemies and finding secrets along the way."
  }
];

User
  .deleteMany()
  .then(() => {
    return User.create(users)
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect();
    throw err
  });

Game
  .deleteMany()
  .then(() => {
    return Game.create(games)
  })
  .then(gamesCreated => {
    console.log(`${gamesCreated.length} users created with the following id:`);
    console.log(gamesCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect()
  })
  .catch(err => {
    mongoose.disconnect();
    throw err
  });
