require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Game = require("../models/Game");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
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
    username: "Brais",
    password: "1234",
    name: "Brais",
    surname: "Vidal",
    role: "ADMIN",
    email: "ironbrais@gmail.com",
    phone: "699338323",
    address: {
      name: "Casa",
      street: "Calle de la Piruleta",
      buildingNumber: 125,
      floor: "1-I",
      zipCode: 28012,
      country: "Spain",
      city: "Madrid"
    },
    chart: [{    }],
    purchases: [{    }],
    wishlist: [{    }],
  },
  {
    username: "Bruno",
    password: "1234",
    name: "Bruno",
    surname: "Vadal",
    role: "ADMIN",
    email: "ironbruno@gmail.com",
    phone: "699338323",
  
    address: {
      name: "Casa",
      street: "Calle de la Piruleta",
      buildingNumber: 125,
      floor: "1-I",
      zipCode: 28012,
      country: "Spain",
      city: "Madrid"
    },
    chart: [{    }],
    purchases: [{    }],
    wishlist: [{    }],
  }
];

let games = [
    {
        "platform": [
            "Nintendo Entertainment System (NES)"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)"
        ],
        "image": [
            "co1r5w.jpg"
        ],
        "companies": [
            "Nintendo",
            "Nintendo EAD"
        ],
        "screenshots": [
            "hqhg84m1938opiactwvx.jpg",
            "rmdhzefetito3kaewgmy.jpg",
            "ayfky3lub2r11kvoh5pp.jpg",
            "cakoghkyhlvhprfkdtcw.jpg",
            "s88qvaejqozjfwvcvnr5.jpg",
            "xynfvbtkeymblhw7z0iz.jpg",
            "goiyxdnf6uov4nuwzh75.jpg",
            "nnhx8ulbz4ozjubiwdng.jpg",
            "d1ho6mr2gmnb3okbhbsl.jpg"
        ],
        "similars": [
            "The Legend of Zelda: A Link to the Past",
            "The Legend of Zelda: Ocarina of Time",
            "The Legend of Zelda: Oracle of Seasons",
            "The Legend of Zelda: The Minish Cap",
            "The Legend of Zelda: Twilight Princess",
            "The Legend of Zelda: Phantom Hourglass",
            "The Legend of Zelda: Oracle of Ages",
            "Castlevania: Symphony of the Night",
            "Ni no Kuni: Wrath of the White Witch",
            "Chasm"
        ],
        "category": "On sale",
        "_id": "5da7686963bbcb59b9987b6c",
        "name": "Zelda II: The Adventure of Link",
        "release": "14/1/1987",
        "description": "The land of Hyrule is in chaos. As Link, you’ll be sent on a treacherous journey to return six precious Crystals to their origins in six stone statues. Only by defeating the guardians of the six palaces will you gain passage to the seventh palace, take on the ultimate challenge that awaits you, and wake the Princess Zelda from her sleeping spell. On your way, helpful villagers you encounter will offer clues and secret messages invaluable in your quest. As you guide Link through the levels of Hyrule, close-ups and overviews will enhance your video vision. Are you up to the challenge?",
        "stock": 10,
        "price": 60
    },
    {
        "platform": [
            "Nintendo Entertainment System (NES)"
        ],
        "genre": [
            "Adventure",
            "Platform"
        ],
        "image": [
            "co1nyx.jpg"
        ],
        "companies": [
            "Nintendo",
            "Nintendo EAD"
        ],
        "screenshots": [],
        "similars": [
            "Super Mario Bros.",
            "Super Mario Bros. 2",
            "Super Mario 64",
            "Super Mario Galaxy 2",
            "Super Mario 3D Land",
            "Super Mario 3D World",
            "Super Paper Mario",
            "Paper Mario",
            "Paper Mario: The Thousand-Year Door",
            "Super Mario 64 DS"
        ],
        "category": "On sale",
        "_id": "5da768c663bbcb59b9987b6d",
        "name": "Super Mario Bros. 3",
        "release": "3/10/1988",
        "description": "Super Mario Bros. 3 is a platform video game for the Nintendo Entertainment System (NES) video game console. Mario and Luigi embark on a quest to save Princess Toadstool and the rulers of seven different kingdoms from the antagonist Bowser and his children, the Koopalings. The player, as Mario or Luigi, is able to defeat enemies by stomping them or using items that bestow magical powers. Mario and Luigi are given a wider range of abilities than in previous Super Mario games, including flying or sliding down slopes. In addition, Super Mario Bros. 3 introduces numerous elements, such as new enemy characters and the use of a world map to transition between levels, that have reappeared in or have influenced subsequent Mario games.",
        "stock": 40,
        "price": 15
    },
    {
        "platform": [
            "PlayStation 3",
            "Xbox 360",
            "Wii"
        ],
        "genre": [
            "Adventure",
            "Platform"
        ],
        "image": [
            "co1n9p.jpg"
        ],
        "companies": [
            "Sega",
            "Sonic Team"
        ],
        "screenshots": [
            "nyie4eek0vak3rvhpkwe.jpg",
            "ncw7m1gxxdchqlq6bmlz.jpg",
            "py3vfqdfh6d0tmddz4rk.jpg",
            "xfpirhkymkjvd3rhqua4.jpg",
            "ytdeuwnmfay72mfdxdpf.jpg"
        ],
        "similars": [
            "Sonic the Hedgehog",
            "Vagante",
            "Toby: The Secret Mine",
            "Forgotton Anne",
            "Celeste",
            "Tanzia",
            "Children of Morta",
            "Pikuniku",
            "Dream Alone",
            "Omensight"
        ],
        "category": "On sale",
        "_id": "5da768ec63bbcb59b9987b6e",
        "name": "Sonic the Hedgehog",
        "release": "14/11/2006",
        "description": "The game shares its name with two earlier Sonic games, a manga, a television series, a comic book series, and their eponymous main character. To disambiguate, the game has been referred to as Sonic 2006. It was produced in commemoration of the 15th anniversary of the Sonic the Hedgehog series. The game faced multiple issues during development, which resulted in rushing the product despite existing bugs. Both versions were heavily criticized for long loading times, poor camera system, gameplay glitches, complicated plot and sloppy character control. \n \nThe game faced development issues which resulted the product being rushed and ultimately a poor product being delivered. Upon release, it was widely criticized for its numerous gameplay glitches, long loading times and complicated plot.",
        "stock": 30,
        "price": 18
    },
    {
        "platform": [
            "Nintendo Switch"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)"
        ],
        "image": [
            "co1p98.jpg"
        ],
        "companies": [
            "Nintendo of America",
            "Nintendo of Europe",
            "Nintendo EPD",
            "Nintendo"
        ],
        "screenshots": [
            "cqozfhn78mvp5zkkopg0.jpg"
        ],
        "similars": [
            "Final Fantasy XV",
            "The Elder Scrolls V: Skyrim",
            "The Legend of Zelda: Ocarina of Time",
            "The Legend of Zelda: Twilight Princess",
            "Ni no Kuni: Wrath of the White Witch",
            "Dragon Age: Inquisition",
            "The Witcher 3: Wild Hunt",
            "Middle-earth: Shadow of Mordor",
            "Horizon Zero Dawn",
            "God of War"
        ],
        "category": "Recommended",
        "_id": "5da784a863bbcb59b9987b70",
        "name": "The Legend of Zelda: Breath of the Wild",
        "release": "3/3/2017",
        "description": "Step into a world of discovery, exploration and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across fields, through forests and to mountain peaks as you discover what has become of the ruined kingdom of Hyrule in this stunning open-air adventure.",
        "stock": 50,
        "price": 69
    },
    {
        "platform": [
            "Arcade"
        ],
        "genre": [
            "Fighting",
            "Arcade"
        ],
        "image": [
            "co1hqd.jpg"
        ],
        "companies": [
            "Capcom"
        ],
        "screenshots": [
            "rcexxd7mxyzkmyhrzzwz.jpg",
            "syvgbep5fd7jnuzmrkwb.jpg",
            "lbwgg6oxjnbbusdgedep.jpg",
            "q9upqmkxk8c5xddgxzrn.jpg",
            "ld3std79dor9bs901jes.jpg",
            "mttb8dzlwnqiikt2ytmj.jpg",
            "uzak07g2t0bhubzryimo.jpg",
            "gtxv3cy5p2arwi6kyg1x.jpg",
            "t5e5iotfigoa3vqwdpgq.jpg",
            "ui8v7st8dzjkjhectt6h.jpg"
        ],
        "similars": [
            "Tekken",
            "Tekken 2",
            "Tekken 3",
            "Tekken 4",
            "Tekken 5",
            "Tekken Tag Tournament",
            "Breath of Fire IV",
            "Street Fighter Alpha 2",
            "Street Fighter Alpha 3",
            "Marvel vs. Capcom 2: New Age of Heroes"
        ],
        "category": "On sale",
        "_id": "5da785d463bbcb59b9987b71",
        "name": "Street Fighter Alpha: Warrior's Dreams",
        "release": "5/6/1995",
        "description": "It's Street Fighter as you always remember it, with some new moves, characters and combo systems, as well as a more polished look and feel. \n \nThe new moves available for each fighter, called Super moves, allow them to fire off very powerful moves. A bar at the bottom of the screen represents the power that you have to use for the moves. You start the first round on 0, and each attack that you make adds power to the bar. Once you reach level 3, you can unleash the special attacks, that can sometimes KO the opponant. \n \nThe other major change over the Street Fighter 2 series are the Alpha counters. These can be used to counter an on-coming attack after blocking.",
        "stock": 20,
        "price": 8
    },
    {
        "platform": [
            "Xbox 360"
        ],
        "genre": [
            "Shooter"
        ],
        "image": [
            "tlitpk2q2sixai0cv2qi.jpg"
        ],
        "companies": [
            "People Can Fly",
            "Epic Games, Inc.",
            "Microsoft Game Studios"
        ],
        "screenshots": [
            "txccwmvw61dnxospzh3w.jpg",
            "gvcptdtdmlkmvynxas7d.jpg",
            "fvidgpneu6qgpga8sbss.jpg",
            "qfbhiurzrro8frjaz2oy.jpg",
            "xsx6p2nro5vjl1lkhcxg.jpg"
        ],
        "similars": [
            "Gears of War 3",
            "Bulletstorm",
            "F.E.A.R. 3",
            "Gears of War 2",
            "Rogue Warrior",
            "Singularity",
            "Syndicate",
            "Gears of War: Judgment",
            "Inversion",
            "Gears of War 4"
        ],
        "category": "On sale",
        "_id": "5da7860063bbcb59b9987b72",
        "name": "Gears of War",
        "release": "7/11/2006",
        "description": "A third-person tactical shooter from Epic, running on the Unreal Engine 3. Gears of War thrusts gamers into a deep and harrowing story of humankind's epic battle for survival against the Locust Horde, a nightmarish race of creatures that surface from the bowels of the planet. \n \nUnlike other shooters, Gears of War is all about teamwork in a big way. All game modes, levels and scenarios are designed specifically to encourage co-operative play, whether it be with A.I. partners or human players (with A.I. teammates designed with specific strengths, weaknesses and personalities.) On top of that, voice recognition will be available for players, and obviously voice chat to discuss strategy with your friends. In addition to voice chat, gamers will be able to experience individualized matchmaking, view player statistics, earn player achievements, customize their games, and build and personalize their gamer profiles over Xbox Live.",
        "stock": 30,
        "price": 20
    },
    {
        "platform": [
            "Nintendo Switch"
        ],
        "genre": [
            "Role-playing (RPG)"
        ],
        "image": [
            "co1p7p.jpg"
        ],
        "companies": [
            "CD Projekt RED",
            "Saber Interactive"
        ],
        "screenshots": [
            "sc6ls0.jpg",
            "sc6ls1.jpg",
            "sc6ls2.jpg",
            "sc6ls3.jpg",
            "sc6ls4.jpg",
            "sc6ls5.jpg",
            "sc6ls6.jpg",
            "sc6ls7.jpg",
            "sc6ls8.jpg"
        ],
        "similars": [
            "Suikoden",
            "Nights of Azure 2: Bride of the New Moon",
            "Red Stone Online",
            "Oriental Blue",
            "Barkley, Shut Up and Jam: Gaiden",
            "Aion: The Tower of Eternity",
            "Legends of Aria",
            "Heroes Legend: Idle RPG",
            "Destiny Connect: Tick-Tock Travelers",
            "The Alliance Alive HD Remastered"
        ],
        "category": "New",
        "_id": "5da7863463bbcb59b9987b73",
        "name": "The Witcher 3: Wild Hunt - Complete Edition",
        "release": "15/10/2019",
        "description": "Winner of over 250 Game of the Year awards, The Witcher 3: Wild Hunt is a story-driven, open world adventure set in a dark fantasy universe. \nYou are Geralt of Rivia, mercenary monster slayer. At your disposal is every tool of the trade: razor-sharp swords, lethal mixtures, stealthy \ncrossbows, and powerful combat magic. Before you stands a war-torn, monster-infested continent you can explore at will. Your current \ncontract? Tracking down the Child of Prophecy, a living weapon that can alter the shape of the world. \nThe Complete Edition contains every piece of downloadable content released for the game, including two massive story expansions: Hearts of \nStone & Blood and Wine. It's the perfect opportunity to enter this world for the first time or relive the adventure — on the go!",
        "stock": 50,
        "price": 29
    },
    {
        "platform": [
            "Nintendo Switch"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)"
        ],
        "image": [
            "co1l22.jpg"
        ],
        "companies": [
            "Square Enix",
            "Nintendo"
        ],
        "screenshots": [
            "sc6h3y.jpg",
            "sc6h3z.jpg",
            "sc6h40.jpg",
            "sc6h41.jpg",
            "sc6h42.jpg",
            "sc6h43.jpg",
            "sc6h44.jpg",
            "sc6h45.jpg",
            "sc6h46.jpg",
            "sc6h47.jpg"
        ],
        "similars": [
            "Atelier Firis: The Alchemist and the Mysterious Journey",
            "The Legend of Heroes: Trails in the Sky the 3rd",
            "Dragon: Marked for Death",
            "The Elder Scrolls VI",
            "Eternity: The Last Unicorn",
            "ANIMA: GATE OF MEMORIES - THE NAMELESS CHRONICLES",
            "Torchlight Frontiers",
            "Pokémon Shield",
            "Persona 5 Royal Limited Edition",
            "Baldur's Gate III"
        ],
        "category": "New",
        "_id": "5da7867163bbcb59b9987b74",
        "name": "Dragon Quest XI S: Echoes of an Elusive Age - Definitive Edition",
        "release": "27/9/2019",
        "description": "Ready for a grand adventure filled with memorable characters, an enchanting story and classic RPG gameplay that can be taken on the go? This definitive version of the critically acclaimed game features the same sprawling content of the original, but with newly added character-specific stories, fully orchestrated field and battle music, and the ability to switch between not only between HD and retro-inspired 16-bit visuals, but also Japanese and English voice track.",
        "stock": 40,
        "price": 46
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Adventure",
            "Puzzle",
            "Point-and-click"
        ],
        "image": [
            "xfdt9435wacmowbxho4o.jpg"
        ],
        "companies": [
            "Double Fine Productions"
        ],
        "screenshots": [
            "hu5bxodqypmlee03ez9a.jpg",
            "ojvghhktwtkfvl2eb8mi.jpg",
            "lby9kivhzsuoyt8auyqn.jpg",
            "wymfig5gueouplqjma2z.jpg",
            "cig4fzariertxz2t7czs.jpg"
        ],
        "similars": [
            "The Secret of Monkey Island",
            "Monkey Island 2: LeChuck's Revenge",
            "Myst",
            "Anna's Quest",
            "Rusty Lake Hotel",
            "Rusty Lake: Roots",
            "The Room: Old Sins",
            "3 Minutes to Midnight",
            "Don't Notice Me",
            "A Fisherman's Tale"
        ],
        "category": "Recommended",
        "_id": "5da786c463bbcb59b9987b75",
        "name": "Grim Fandango Remastered",
        "release": "27/1/2015",
        "description": "Something's rotten in the land of the dead, and you're being played for a sucker. Meet Manny Calavera, travel agent at the Department of Death. He sells luxury packages to souls on their four-year journey to eternal rest. But there's trouble in paradise. Help Manny untangle himself from a conspiracy that threatens his very salvation. \n \nOne of the most acclaimed adventure games of all time is now back, better than ever. Grim Fandango's epic story of four years in the life (or death) of Manny Calavera, travel agent to the dead, has been remastered to look, sound, and control even better than when it won GameSpot's Game of the Year award upon its original launch. Grim Fandango still stands as a classic of the genre, with unforgettable characters and unique combination of film noir and Mexican folklore.",
        "stock": 30,
        "price": 8
    },
    {
        "platform": [
            "Nintendo Switch"
        ],
        "genre": [
            "Adventure",
            "Indie",
            "Hack and slash/Beat 'em up",
            "Platform"
        ],
        "image": [
            "co1rgi.jpg"
        ],
        "companies": [
            "Team Cherry"
        ],
        "screenshots": [
            "p3svrq6ewzxnn7p1a3v9.jpg",
            "bkgxmg2m4h8wf5g9tblh.jpg",
            "ityinxmtkakwbokpcwws.jpg",
            "a3f72xprqkfuqdmha5ks.jpg",
            "q634ullxbvipm6q6mcq9.jpg"
        ],
        "similars": [
            "Chasm",
            "Momodora: Reverie Under the Moonlight",
            "Tunic",
            "Forgotton Anne",
            "Celeste",
            "Dead Cells",
            "PLANET ALPHA",
            "Children of Morta",
            "Citadel: Forged With Fire",
            "Dream Alone"
        ],
        "category": "Recommended",
        "_id": "5da786f463bbcb59b9987b76",
        "name": "Hollow Knight",
        "release": "24/2/2017",
        "description": "Hollow Knight is the first game by Team Cherry, an indie games team comprised of 3 people based in South Australia. \n \nHollow Knight is a challenging, beautiful action adventure game set in the vast, inter-connected underground kingdom of Hallownest. A 2D action game with an emphasis on skill and exploration, Hollow Knight has you fighting a fearsome host of deadly creatures, avoiding intricate traps and solving ancient mysteries as you make your own way through fungal wastes, forests of bone, and ruined underground cities. \n \nThe atmosphere is eerie and sometimes unnerving, but there is a good-hearted core of humour and levity in there too, especially when conversing with all of the weird and wonderful NPCs you’ll find along the way. Hollow Knight has beautiful traditional art, fluid and responsive action, challenging but fair gameplay, and an incredible, bizarre insect world begging to be explored and conquered. \nFeatures \n \n - A beautiful, eerie world of insects and heroes. \n - Traditional 2D animation brings creatures and characters to life. \n - Challenging gameplay that can be difficult but always fair. \n - Fluid and responsive action allows you to flow through combat like water. \n - A collection of challenging “feats” the most skilled players can strive for. \n - Find powerful new abilities and spells on your adventure to grow stronger and open new paths. \n - Speak with a weird, intriguing cast of characters. \n - Explore a vast, connected underground world. \n - Scour the world for hidden secrets – powerful artifacts, piles of riches, and surprising encounters. \n - Go Dream Diving! Venture into the minds of friends and enemies and discover the strange worlds that await within. \n - Head to town to seek advice, purchase new items, and chat with quirky townsfolk. \n - Hidden areas full of the toughest challenges and battles, for expert players. \n - Ancient mysteries hidden about the world waiting to be solved by the most observant investigators.",
        "stock": 30,
        "price": 15
    },
    {
        "platform": [
            "Nintendo Switch"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)",
            "Indie",
            "Hack and slash/Beat 'em up",
            "Platform"
        ],
        "image": [
            "esby831i9tkzlbr9lth6.jpg"
        ],
        "companies": [
            "The Game Kitchen",
            "Team17 Digital Ltd"
        ],
        "screenshots": [
            "ywoyxuh40qtc8wpwimaw.jpg",
            "sarl71afcl8woz1ph2bj.jpg",
            "lglt9dkqc4vcndib1uej.jpg",
            "sc6wh8.jpg",
            "sc6wh9.jpg",
            "sc6wha.jpg",
            "sc6whb.jpg",
            "sc6whc.jpg",
            "sc6whd.jpg"
        ],
        "similars": [
            "PLANET ALPHA",
            "Pepper Grinder",
            "Dragon: Marked for Death",
            "Omensight",
            "The Elder Scrolls VI",
            "Eternity: The Last Unicorn",
            "Warhammer: Chaosbane",
            "Torchlight Frontiers",
            "Hytale",
            "Hob: The Definitive Edition"
        ],
        "category": "New",
        "_id": "5da7871363bbcb59b9987b77",
        "name": "Blasphemous",
        "release": "10/9/2019",
        "description": "Blasphemous is a punishing action-platformer that combines the fast-paced, skilled combat of a hack-n-slash game with a deep and evocative narrative core. \n \nExplore this nightmarish world of twisted religion and discover its many secrets hidden deep inside. Use devastating combos and brutal executions to smite the hordes of grotesque monsters and titanic bosses, who are all ready to rip your limbs off. Locate and equip relics, rosary beads and prayers that call on the powers of the heavens to aid you in your quest to break your eternal damnation. \n \nKey Features: \n \nExplore a Non-Linear World: Overcome fearsome enemies and deadly traps as you venture through a variety of different landscapes, and search for redemption in the dark gothic world of Cvstodia. \n \n \n \nBrutal Combat: Release the power of Mea Culpa, a sword born from guilt itself, to slaughter your foes. Acquire devastating new combos and special moves as you purge all in your path. \n \n \n \nExecutions: Unleash your wrath and relish in the gory dismemberment of your adversaries - all in beautifully rendered, pixel-perfect execution animations. \n \n \n \nCustomise Your Build: Discover and equip Relics, Rosary Beads, Prayers and Sword Hearts to give you the new abilities and stat boosts you need to survive. Experiment with different combinations to suit your playstyle. \n \n \n \nEpic Boss Battles: Hordes of gigantic, twisted creatures stand between you and your goal. Learn how they move, survive their devastating attacks and emerge victorious. \n \n \n \nUnlock the Mysteries of Cvstodia: The world is full of tormented souls. Some offer you aid, some may ask for something in return. Uncover the stories and fates of these tortured characters to gain rewards and a deeper understanding of the dark world you inhabit.",
        "stock": 30,
        "price": 15
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Adventure",
            "Shooter"
        ],
        "image": [
            "co1rca.jpg"
        ],
        "companies": [
            "Capcom"
        ],
        "screenshots": [
            "io6hffcfxfgtibwwn9jl.jpg",
            "ctxtlpyzlo3q5hvshysw.jpg",
            "wyn4sipweizrkjvshid9.jpg",
            "tc63ssff6rzvaiq1xjuw.jpg",
            "r03xsdmmrxyddimojni1.jpg"
        ],
        "similars": [
            "Dishonored",
            "Amnesia: A Machine for Pigs",
            "Gone Home",
            "Wolfenstein: The New Order",
            "Murdered: Soul Suspect",
            "Deus Ex: Mankind Divided",
            "SOMA",
            "Dishonored 2",
            "The Cat Lady",
            "Prey"
        ],
        "category": "Recommended",
        "_id": "5da7873563bbcb59b9987b78",
        "name": "Resident Evil 7: Biohazard",
        "release": "24/1/2017",
        "description": "Resident Evil 7: Biohazard is a survival horror video game developed by Capcom, for Microsoft Windows, PlayStation 4, and Xbox One, with the PlayStation 4 version including full PlayStation VR support.",
        "stock": 42,
        "price": 30
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Adventure",
            "Shooter"
        ],
        "image": [
            "co1n3s.jpg"
        ],
        "companies": [
            "Kojima Productions",
            "Sony Interactive Entertainment"
        ],
        "screenshots": [],
        "similars": [
            "Borderlands 3",
            "Marvel's Spider-Man",
            "The Last of Us: Part II",
            "Marvel's Avengers",
            "Immortal: Unchained",
            "Sekiro: Shadows Die Twice",
            "Dying Light 2",
            "Remnant: From the Ashes",
            "Gene Rain",
            "Rebel Galaxy Outlaw"
        ],
        "category": "New",
        "_id": "5da7877b63bbcb59b9987b79",
        "name": "Death Stranding",
        "release": "8/11/2019",
        "description": "Death Stranding is an upcoming open world action video game developed by Kojima Productions and published by Sony Interactive Entertainment for the PlayStation 4. One of the key aspects of the game is the connection between life and death.",
        "stock": 30,
        "price": 60
    },
    {
        "platform": [
            "PlayStation"
        ],
        "genre": [
            "Sport"
        ],
        "image": [
            "co1o73.jpg"
        ],
        "companies": [
            "Edge of Reality",
            "Shaba Games",
            "Activision",
            "Neversoft Entertainment",
            "HotGen",
            "Gearbox Software",
            "Vicarious Visions"
        ],
        "screenshots": [
            "gutc9vsstkxumzkmw3jj.jpg",
            "hklcrbypjwduceigroik.jpg",
            "c0gwynkji2mcuvz410g8.jpg",
            "lrtfkqbptlydnkfvmwmg.jpg",
            "luqw5zzljwgxdaznimog.jpg"
        ],
        "similars": [
            "Tony Hawk's Pro Skater 2",
            "Tony Hawk's Pro Skater 4",
            "Tony Hawk's Underground",
            "Tony Hawk's Underground 2",
            "Tony Hawk's Proving Ground",
            "Tony Hawk's Project 8",
            "Rumble Roses XX",
            "Tony Hawk's American Wasteland",
            "Honey Select",
            "Tony Hawk's Pro Skater 2X"
        ],
        "category": "On sale",
        "_id": "5da7881a63bbcb59b9987b7a",
        "name": "Tony Hawk's Pro Skater 3",
        "release": "28/10/2001",
        "description": "You may not be able to live like the legend, but now you can skate like him. Skate as the legendary Tony Hawk or choose from a dream team of 12 top pro skaters, including old favorites like Lasek, Thomas, Muska, and Steamer, as well as new talent like Gilfberg, Caballero, Koston, and Mullen. Or enjoy full customization abilities with the enhanced Create-a-Skater (now including female skaters) and the Skatepark Editor. Travel from L.A. to Tokyo, Suburbia to Skater's Island performing challenges and meeting goals. New moves include the Revert, which allows you to link vert tricks, and flatland tricks such as Caspers, the Primo, and Handstand Manual. If you're good, you can even unlock hidden pro footage.",
        "stock": 30,
        "price": 50
    },
    {
        "platform": [
            "PlayStation 3"
        ],
        "genre": [
            "Adventure",
            "Shooter"
        ],
        "image": [
            "co1r7f.jpg"
        ],
        "companies": [
            "Sony Computer Entertainment, Inc. (SCEI)",
            "Naughty Dog"
        ],
        "screenshots": [
            "upogjfthdffjlzfi26xe.jpg",
            "emvrwg5vhpfcmn9loxgu.jpg",
            "kdt90b2rbx4tmewaxur9.jpg",
            "oon90tsbpin8qae3rldz.jpg",
            "rta7qwesachxsykzwokf.jpg"
        ],
        "similars": [
            "Dishonored",
            "Bioshock Infinite",
            "Grand Theft Auto V",
            "Watch_Dogs",
            "Tomb Raider",
            "Metal Gear Solid V: The Phantom Pain",
            "Wolfenstein: The New Order",
            "Dying Light",
            "The Cat Lady",
            "Watch Dogs 2"
        ],
        "category": "Recommended",
        "_id": "5da7885f63bbcb59b9987b7b",
        "name": "The Last of Us",
        "release": "14/6/2013",
        "description": "A third person shooter/stealth/survival hybrid, in which twenty years after the outbreak of a parasitic fungus which takes over the neural functions of humans, Joel, a Texan with a tragic familial past, finds himself responsible with smuggling a fourteen year old girl named Ellie to a militia group called the Fireflies, while avoiding strict and deadly authorities, infected fungal hosts and other violent survivors.",
        "stock": 50,
        "price": 42
    },
    {
        "platform": [
            "Wii"
        ],
        "genre": [
            "Adventure",
            "Hack and slash/Beat 'em up"
        ],
        "image": [
            "co1i8l.jpg"
        ],
        "companies": [
            "Ubisoft Entertainment",
            "Grasshopper Manufacture"
        ],
        "screenshots": [
            "rkhwn6iwmksiltgk9or3.jpg",
            "ybknwrr61tnk5o4dsmzf.jpg",
            "rabq8prh4qjq2950lw66.jpg",
            "h3ow0uutdzpfnqdqw9hv.jpg",
            "vmr8pewahertllgohjhd.jpg"
        ],
        "similars": [
            "Dishonored",
            "God of War II",
            "God of War: Chains of Olympus",
            "Rogue Warrior",
            "Grand Theft Auto: San Andreas",
            "Watch_Dogs",
            "Wolfenstein: The New Order",
            "Jade Empire",
            "Persona 5",
            "Watch Dogs 2"
        ],
        "category": "Recommended",
        "_id": "5da7889c63bbcb59b9987b7c",
        "name": "No More Heroes",
        "release": "6/12/2007",
        "description": "The journey to become the #1 assassin begins with a single slice \n \nNo More Heroes is the story of Travis Touchdown. He has received orders to kill a vagabond. In front of him appears the handsome assassin Helter Skelter. After a fierce skirmish, Travis eliminates Skelter, upon which Silvia Christel arrives. She informs Travis that his victory was done without UAA permission, but he nonetheless becomes the 11th best assassin. And so Travis’s journey begins. \n \nUsing the unique characteristics of Nintendo Wii, No More Heroes will offer an exhilarating action experience, a thrilling scenario written by Suda51, and stylish visuals and sounds created by Grasshopper Manufacture Inc. \n \n- Hack and Smash Your Way Through Santa Destroy, California: Unleash a lethal combination of sword slashes and wrestling moves in this fast paced third-person action game. Easy to learn, but challenging to master. \n \n- Roam a Sand Box Universe in Full 3D: Immerse yourself in a modern, highly stylized world. Roam the city on foot or slide around corners on your speed bike. \n \n- An Action Experience Unlike Any Other on Wii: Bring the pain and let your plasma-beam katana do the talking. You control the action with two Wii remote sensitive attack stances and an arsenal of close combat wrestling moves. \n \n- Interactive Special Attacks and Over-The-Top Finishing Moves: Complete special moves by matching your Wii remote's movements to the cues on screen. The crazier you finish off your opponent, the more cash you'll earn for your efforts. \n \n- Side Missions and Mini-Games: Complete side jobs for extra cash or just play them for fun. Features games like Pizza Delivery, Graffiti Blaster and Speed Bike Racing. \n \n- Highly Stylized Environments and Gameplay: Features environments that are both stunning and stylish. Gameplay gives a nod to the classic arcade games of the 80's, as well as the games of tomorrow.",
        "stock": 30,
        "price": 20
    },
    {
        "platform": [
            "PlayStation"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)",
            "Turn-based strategy (TBS)"
        ],
        "image": [
            "co1l94.jpg"
        ],
        "companies": [
            "Square Soft",
            "Square Electronic Arts",
            "Square Enix",
            "Infogrames"
        ],
        "screenshots": [],
        "similars": [
            "Final Fantasy XIII-2",
            "Final Fantasy III",
            "Final Fantasy XII",
            "Final Fantasy VIII",
            "Final Fantasy VI",
            "Final Fantasy VII",
            "Final Fantasy Tactics",
            "Planescape: Torment",
            "Kingdom Hearts",
            "Chrono Cross"
        ],
        "category": "Recommended",
        "_id": "5da81a7c1b5def6e9aca2b46",
        "name": "Final Fantasy IX",
        "release": "7/7/2000",
        "description": "The ninth installment in the long-running RPG series and the final for the original PlayStation, Final Fantasy IX gives fans of the franchise the nostalgic thrill of re-experiencing the visual style, gameplay elements and overall spirit of the 16-bit Final Fantasy games of the 8/16 bit eras. The main story centers on Zidane Tribal, a young thief who quickly becomes engaged in a quest to save the world, along with Vivi Ornitier, a young black mage, and Princess Garnet, heir to the throne of Alexandria. The game features detailed polygonal character models and lush pre-rendered backgrounds. They all combine for an unforgettable adventure!",
        "stock": 10,
        "price": 40
    },
    {
        "platform": [
            "Xbox One"
        ],
        "genre": [
            "Fighting",
            "Indie",
            "Platform"
        ],
        "image": [
            "co1rcx.jpg"
        ],
        "companies": [
            "Studio MDHR"
        ],
        "screenshots": [
            "sqho6e7tv9verg6j1tvv.jpg",
            "r9zt66wdgqohmhuukiir.jpg",
            "ec5tsfhl7wjabwjnsshs.jpg",
            "eulkrcocd1zyuvvcv7k0.jpg",
            "sngyjwqwzzlciy0ko0sq.jpg"
        ],
        "similars": [
            "Dishonored",
            "Brothers: A Tale of Two Sons",
            "The Vanishing of Ethan Carter",
            "Murdered: Soul Suspect",
            "SOMA",
            "Dishonored 2",
            "What Remains of Edith Finch",
            "The Cat Lady",
            "Undertale",
            "Owlboy"
        ],
        "category": "On sale",
        "_id": "5da81ac31b5def6e9aca2b47",
        "name": "Cuphead",
        "release": "29/9/2017",
        "description": "Cuphead is a classic run and gun action game heavily focused on boss battles. Inspired by cartoons of the 1930s, the visuals and audio are painstakingly created with the same techniques of the era, i.e. traditional cel animation (hand drawn & hand inked!), watercolor backgrounds, and original jazz recordings. Play as Cuphead or Mugman (in single player or co-op) as you traverse strange worlds, acquire new weapons, learn powerful super moves, and discover hidden secrets. Cuphead is all action, all the time.",
        "stock": 30,
        "price": 25
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Simulator",
            "Adventure",
            "Role-playing (RPG)",
            "Shooter",
            "Indie"
        ],
        "image": [
            "co1k01.jpg"
        ],
        "companies": [
            "Hello Games",
            "Sony Interactive Entertainment",
            "505 Games"
        ],
        "screenshots": [
            "slbfwlrvqjrgvrvfghrk.jpg",
            "xufkotfn5udk2aijb6f0.jpg",
            "kmyailnbyy0afbyqdfxn.jpg",
            "byull3k2xzfndgivkdlw.jpg",
            "o0pqdynpsv7vvziaxwzr.jpg",
            "hlv3vnzamh1l3pdc2omn.jpg",
            "wihfvjowvwt4lx0qw5eo.jpg",
            "s6p3zqbfof7kncyp7ocf.jpg",
            "bynzojxiouy00pqw1utm.jpg",
            "mdhzsdazyj8vyht9wnnj.jpg"
        ],
        "similars": [
            "Starbound",
            "Get Even",
            "Life is Feudal: Your Own",
            "Starmade",
            "Rising World",
            "Ziggurat",
            "Miscreated",
            "Empyrion - Galactic Survival",
            "Force of Nature",
            "Children of Morta"
        ],
        "category": "On sale",
        "_id": "5da81afc1b5def6e9aca2b48",
        "name": "No Man's Sky",
        "release": "9/8/2016",
        "description": "Inspired by the adventure and imagination that we love from classic science-fiction, No Man's Sky presents you with a galaxy to explore, filled with unique planets and lifeforms, and constant danger and action. \n \nIn No Man's Sky, every star is the light of a distant sun, each orbited by planets filled with life, and you can go to any of them you choose. Fly smoothly from deep space to planetary surfaces, with no loading screens, and no limits. In this infinite procedurally generated universe, you'll discover places and creatures that no other players have seen before - and perhaps never will again.",
        "stock": 50,
        "price": 46
    },
    {
        "platform": [
            "Xbox One"
        ],
        "genre": [
            "Role-playing (RPG)",
            "Shooter"
        ],
        "image": [
            "co1r7s.jpg"
        ],
        "companies": [
            "Ubisoft Reflections",
            "Ubisoft Annecy",
            "Red Storm Entertainment",
            "Massive Entertainment",
            "Ubisoft Shanghai",
            "Ubisoft Bucharest",
            "Ubisoft"
        ],
        "screenshots": [],
        "similars": [
            "Borderlands 3",
            "Star Control: Origins",
            "Biomutant",
            "Immortal: Unchained",
            "The Elder Scrolls VI",
            "RAGE 2",
            "Anthem: Legion of Dawn Edition",
            "Remnant: From the Ashes",
            "Gene Rain",
            "The Outer Worlds"
        ],
        "category": "On sale",
        "_id": "5da81b251b5def6e9aca2b49",
        "name": "Tom Clancy's The Division 2",
        "release": "15/3/2019",
        "description": "The Division 2 is an action-shooter RPG set in an open-world. Play in co-op and PvP modes that offer more variety in missions and challenges, new progression systems with unique twists and surprises, and fresh gaming innovations to engage players for years to come.",
        "stock": 30,
        "price": 29
    },
    {
        "platform": [
            "Xbox One"
        ],
        "genre": [
            "Shooter"
        ],
        "image": [
            "co1re6.jpg"
        ],
        "companies": [
            "2K Games",
            "Gearbox Software"
        ],
        "screenshots": [],
        "similars": [
            "Marvel's Avengers",
            "Immortal: Unchained",
            "The Elder Scrolls VI",
            "Doom: Eternal",
            "Wolfenstein: Youngblood",
            "Remnant: From the Ashes",
            "Torchlight Frontiers",
            "Rune Factory 4 Special",
            "Hob: The Definitive Edition",
            "Tom Clancy's Ghost Recon: Breakpoint"
        ],
        "category": "New",
        "_id": "5da820d18e46ee7ac05a1192",
        "name": "Borderlands 3",
        "release": "13/9/2019",
        "description": "The original shooter-looter returns, packing bazillions of guns and a mayhem-fueled adventure! Blast through new worlds and enemies as one of four new Vault Hunters. Play solo or with friends to take on insane enemies, score loads of loot and save your home from the most ruthless cult leaders in the galaxy.",
        "stock": 50,
        "price": 54
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Adventure",
            "Indie",
            "Puzzle",
            "Platform"
        ],
        "image": [
            "co1qsm.jpg"
        ],
        "companies": [
            "Frozenbyte",
            "Modus Games"
        ],
        "screenshots": [
            "sc68hd.jpg",
            "sc68he.jpg",
            "sc68hf.jpg",
            "sc68hg.jpg",
            "sc68hh.jpg",
            "sc68hi.jpg",
            "sc68hj.jpg"
        ],
        "similars": [
            "Forgotton Anne",
            "Don't Knock Twice",
            "PLANET ALPHA",
            "Pepper Grinder",
            "Pikuniku",
            "Eternity: The Last Unicorn",
            "Degrees of Separation",
            "Apsulov: End of Gods",
            "Hytale",
            "Hob: The Definitive Edition"
        ],
        "category": "New",
        "_id": "5da821508e46ee7ac05a1193",
        "name": "Trine 4: The Nightmare Prince",
        "release": "8/10/2019",
        "description": "Featuring an all-new story that reunites Amadeus, Pontius, and Zoya, Trine 4: The Nightmare Prince returns to the magic of 2.5D with the puzzle-platforming gameplay that defined a genre in Trine 1 and 2. Play as the three iconic heroes in the most extensive Trine adventure yet, complete with stunning new environments and dynamic, physics-based puzzles that fans have grown to know and love.  \n \nAfter years apart, the Astral Academy has requested help from the three heroes to find Prince Selius, whose intensely dark nightmares have begun to slip into reality and wreak havoc on the waking world. Encounter more epic boss fights than ever before, solve fascinating puzzles, unlock new skills, explore lush, vibrant landscapes, and experience a hauntingly beautiful new soundtrack by the composer of Trine 1-3. Additionally, and for the first time ever, Trine adds four-player co-op to its feature list.",
        "stock": 40,
        "price": 20
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Shooter"
        ],
        "image": [
            "co1l8x.jpg"
        ],
        "companies": [
            "Ubisoft Paris",
            "Ubisoft"
        ],
        "screenshots": [],
        "similars": [
            "Borderlands 3",
            "Left Alive",
            "World War 3",
            "Halo Infinite",
            "Gears 5",
            "Doom: Eternal",
            "Wolfenstein: Youngblood",
            "Remnant: From the Ashes",
            "Call of Duty: Mobile",
            "Call Of Duty: Modern Warfare"
        ],
        "category": "New",
        "_id": "5da821bc8e46ee7ac05a1194",
        "name": "Tom Clancy's Ghost Recon: Breakpoint",
        "release": "4/10/2019",
        "description": "Tom Clancy’s Ghost Recon Breakpoint is a military shooter set in a diverse and hostile open world entirely playable solo or in up to four-player co-op. Players will discover Auroa, a mysterious island where the most technically advanced facilities meet wild and untamed nature. Home to drone creators, tech giant Skell Technology, Auroa has fallen into the wrong hands and all contact has been lost. \n \nThe Wolves, a lethal ex–US Military unit of former Ghosts gone rogue, have taken over the island. Led by Nomad’s ex-brother-in-arms, Lt. Colonel Cole D. Walker, portrayed by Jon Bernthal, they have reprogrammed Skell’s drones into killing machines and are ready to use them, no matter the casualties. Nomad and the Ghosts are sent in on a recon mission, but their helicopters are shot down. Injured, without support, and hunted down, players will live an intense military experience as they fight to survive, take down the Wolves and regain control of Auroa.",
        "stock": 60,
        "price": 63
    },
    {
        "platform": [
            "Nintendo Entertainment System (NES)"
        ],
        "genre": [
            "Adventure",
            "Platform"
        ],
        "image": [
            "qnr96vly4h0ug2dxrvip.jpg"
        ],
        "companies": [
            "Arika Co., Ltd.",
            "Nintendo",
            "HAL Laboratory"
        ],
        "screenshots": [],
        "similars": [
            "Kirby Super Star Ultra",
            "Chasm",
            "Kirby: Canvas Curse",
            "Kirby: Nightmare in Dream Land",
            "Toby: The Secret Mine",
            "Legrand Legacy",
            "Tunic",
            "Forgotton Anne",
            "Celeste",
            "Dream Alone"
        ],
        "category": "On sale",
        "_id": "5da8260a8e46ee7ac05a1195",
        "name": "Kirby's Adventure",
        "release": "23/3/1993",
        "description": "Not everything is well in Dream Land. For some mysterious reason, the Dream Spring, a magical well that is the reservoir for all the dreams of the citizens of Dream Land, is no longer working. Everyone is being subjected to their worst nightmares every time they go to sleep. Upon reaching the Dream Spring, Kirby finds out that evil King Dedede has stolen the Star Rod, thus depriving Dream Land of the magical energy that feeds its spring. Using 20 unique tricks and your ability to steal your enemies' powers by swallowing them, you'll have to make your way through a horrific land filled with all kinds of nightmares. Recover the broken pieces of the Star Rod, and everyone in Dream Land will sleep peacefully once again. If you fail, the citizens of Dream Land will be subjected to a lifetime of terrible nightmares.",
        "stock": 50,
        "price": 12
    },
    {
        "platform": [
            "Nintendo Entertainment System (NES)"
        ],
        "genre": [
            "Shooter",
            "Platform",
            "Arcade"
        ],
        "image": [
            "t06qzvoaqyowmf6olmhv.jpg"
        ],
        "companies": [
            "Konami"
        ],
        "screenshots": [
            "c5valn3m6zjzapidrrua.jpg",
            "q3pipllynjwpzqzu26sd.jpg",
            "m4osraumkpzcmivaj94t.jpg",
            "vyecqrdfrwpf4gonyb8f.jpg"
        ],
        "similars": [
            "Superfighters Deluxe",
            "Marvel's Avengers",
            "Immortal: Unchained",
            "Anthem: Legion of Dawn Edition",
            "Doom: Eternal",
            "Wolfenstein: Youngblood",
            "Remnant: From the Ashes",
            "Gene Rain",
            "Rebel Galaxy Outlaw",
            "PlanetSide Arena"
        ],
        "category": "On sale",
        "_id": "5da8280d8e46ee7ac05a1196",
        "name": "Super Contra",
        "release": "8/1/1988",
        "description": "Super Contra is a Run and Gun-style action game produced by Konami, originally released as a coin-operated arcade game in 1988. It is the sequel to the original Contra and the second game in the Contra series released for the arcades. Like in the original game, the game centers on soldiers Bill Rizer and Lance Bean, who are once again assigned to protect the Earth from an army of alien invaders. The game features standard side-scrolling stages, as well as all new overhead stages in lieu of the original game's \"3D\" stages. \n \nLike its predecessor, a modified console version was made for the Nintendo Entertainment System, which saw release in North America as Super C and in Europe and Australia as Probotector II: Return of the Evil Forces. Both the arcade game and the NES game, have been re-released in various other platforms since their original releases.",
        "stock": 30,
        "price": 17
    },
    {
        "platform": [
            "Wii"
        ],
        "genre": [
            "Fighting"
        ],
        "image": [
            "co1nvc.jpg"
        ],
        "companies": [
            "Spike",
            "Atari",
            "Bandai"
        ],
        "screenshots": [
            "q5ovrz621rqjjtlsqret.jpg",
            "rzo1zy7epyg85dxtjoui.jpg",
            "nogtr8kpqlgrgpfkp9ua.jpg",
            "dx1736l0rk3h0sbwh4to.jpg",
            "ryxm3ruig85ockxy4ppr.jpg",
            "hpb6lrucd4vnamgo6ux1.jpg",
            "xaur0vbdfse1yxoddnou.jpg"
        ],
        "similars": [
            "One Piece: Grand Battle! Rush",
            "SNK vs. Capcom: SVC Chaos",
            "Super Street Fighter II: The New Challengers",
            "The King of Fighters '99: Millennium Battle",
            "JoJo's Bizarre Adventure: Heritage for the Future",
            "JoJo's Bizarre Adventure HD Ver.",
            "SAMURAI SHODOWN",
            "Blade Arcus Rebellion from Shining",
            "Ben 10: Battle Ready",
            "Jump Force: Deluxe Edition"
        ],
        "category": "On sale",
        "_id": "5da829228e46ee7ac05a1197",
        "name": "Dragon Ball Z: Budokai Tenkaichi 3",
        "release": "4/10/2007",
        "description": "Budokai Tenkaichi 3 is a 1vs1 fighting game based on the anime/manga Dragon Ball by Akira Toriyama. It includes the apocalyptic battles and the essence of the Dragon Ball series following the main story of the popular manga. As in the previous games of the series, you'll have to select your character (over 162 characters with their own movements and combos) and fight against a friend or the computer in many different game modes with many different stages and weather/time conditions.",
        "stock": 20,
        "price": 15
    },
    {
        "platform": [
            "PlayStation 3"
        ],
        "genre": [
            "Adventure",
            "Hack and slash/Beat 'em up"
        ],
        "image": [
            "co1n15.jpg"
        ],
        "companies": [
            "Capcom",
            "QLOC",
            "Ninja Theory"
        ],
        "screenshots": [
            "szriguxzxkqjoznswhzu.jpg",
            "nwqfeif4retbwzcsjqd2.jpg",
            "qzsgtizvky1ekjr71wsh.jpg",
            "phwz0kjz2cqy4hfgeb0m.jpg",
            "dkzc0en0buruihwrlnwt.jpg"
        ],
        "similars": [
            "Dishonored",
            "Bioshock Infinite",
            "Grand Theft Auto V",
            "Tomb Raider",
            "Spec Ops: The Line",
            "Wolfenstein: The New Order",
            "Murdered: Soul Suspect",
            "Deus Ex: Mankind Divided",
            "SOMA",
            "The Cat Lady"
        ],
        "category": "On sale",
        "_id": "5da829418e46ee7ac05a1198",
        "name": "DmC: Devil May Cry",
        "release": "15/1/2013",
        "description": "In this retelling of Dante's origin story which is set against a contemporary backdrop, DmC Devil May Cry retains the stylish action, fluid combat and self-assured protagonist that have defined the iconic series but inject a more brutal and visceral edge.",
        "stock": 34,
        "price": 26
    },
    {
        "platform": [
            "PlayStation 4"
        ],
        "genre": [
            "Adventure",
            "Role-playing (RPG)"
        ],
        "image": [
            "co1rga.jpg"
        ],
        "companies": [
            "Square Enix"
        ],
        "screenshots": [
            "xunc9o8wavkyzmbjodmx.jpg",
            "rtmylwlls2xkx2gjplp1.jpg",
            "cgcarrrbtikn87bmhsx5.jpg"
        ],
        "similars": [
            "Legrand Legacy",
            "Tunic",
            "Code Vein",
            "Tanzia",
            "Wanderlust Adventures",
            "Children of Morta",
            "Citadel: Forged With Fire",
            "Immortal: Unchained",
            "Dragon: Marked for Death",
            "Omensight"
        ],
        "category": "On sale",
        "_id": "5da829718e46ee7ac05a1199",
        "name": "Secret of Mana",
        "release": "15/2/2018",
        "description": "\"The memorable adventure of Randi, Primm and Popoi is reborn as \"Secret of Mana\"! \nEmbark on an action-packed, worldwide adventure in this 3D remake.\"",
        "stock": 34,
        "price": 15
    },
    {
        "platform": [
            "Wii U",
            "Nintendo 3DS"
        ],
        "genre": [
            "Role-playing (RPG)"
        ],
        "image": [
            "lkspfy9dq9d0mqo0lesy.jpg"
        ],
        "companies": [
            "Capcom"
        ],
        "screenshots": [],
        "similars": [
            "Darkstone",
            "Rising World",
            "Code Vein",
            "Tanzia",
            "Wanderlust Adventures",
            "Children of Morta",
            "Citadel: Forged With Fire",
            "Secret of Mana",
            "Dragon: Marked for Death",
            "Omensight"
        ],
        "category": "On sale",
        "_id": "5da82a1d8e46ee7ac05a119a",
        "name": "Monster Hunter 3 Ultimate",
        "release": "10/12/2011",
        "description": "The popular fantasy action franchise Monster Hunter is now one of the most iconic gaming series in the world selling over 21 million copies worldwide since the series began in 2004. Players take on the role of a hunter and are sent to explore a settlement within the Monster Hunter universe, completing quests on their journey to seek and slay monsters whilst improving their skills and earning equipment upgrades. With many challenging monsters and over 200 quests the latest edition to the series is set to be the most expansive offering to date. Monster Hunter 3 Ultimate utilizes the functionalities of the Nintendo 3DS system to provide players with a truly intuitive hunting experience. The touch screen feature allows players to quickly access in-game books, weapons, field maps and mini games whilst the high quality graphics 3D visuals of Nintendo 3DS powered by the latest iteration of Capcom's MT Framework deliver a unique and stunning world for players to explore. Taking advantage of the portability of Nintendo 3DS, players can exchange their guild card that contains all their hunter's information with other players via StreetPass. Players can experience the world of Monster Hunter alone or in four player local play using Nintendo 3DS. Finding nearby hunters to adventure on quests with is now even easier via the local Nintendo 3DS search feature. Wii U players will be able to enjoy the hunt with Nintendo 3DS players via a local wireless connection. Gamers that own both a Wii U and Nintendo 3DS can take advantage of the inter compatibility of save data between the two consoles, taking the hunt from the living room wherever they go.",
        "stock": 45,
        "price": 30
    },
    {
        "platform": [
            "Xbox 360"
        ],
        "genre": [
            "Adventure",
            "Shooter"
        ],
        "image": [
            "co1rqa.jpg"
        ],
        "companies": [
            "Crystal Dynamics",
            "Square Enix",
            "Microsoft Studios"
        ],
        "screenshots": [
            "qgbk3c7ws8mapylzswat.jpg",
            "mbidhmrrzdoxv6flh4x3.jpg",
            "s5wyp8ujrmjifueaypxl.jpg",
            "feoegrjyhepdrs5tubrr.jpg",
            "bymhdw6rhislriio8n0d.jpg",
            "friid2lfemtabcrby6zh.jpg",
            "htt4wmsndvo3el8xgcnv.jpg",
            "cdgscwy875dewjdxdfr7.jpg",
            "vwcam22erhj59b8wgwxi.jpg",
            "u3obs5jsfqponnkp3qp1.jpg"
        ],
        "similars": [
            "Rogue Warrior",
            "The Last of Us",
            "Tom Clancy's The Division",
            "Middle-earth: Shadow of Mordor",
            "Batman: Arkham Knight",
            "Uncharted 4: A Thief's End",
            "Ori and the Blind Forest",
            "Aarklash: Legacy",
            "Tom Clancy's Ghost Recon: Wildlands",
            "Ziggurat"
        ],
        "category": "On sale",
        "_id": "5da82a418e46ee7ac05a119b",
        "name": "Rise of the Tomb Raider",
        "release": "10/11/2015",
        "description": "Join Lara Croft on her first great tomb raiding expedition as she seeks to discover the secret of immortality. Featuring high-octane action set in the most beautiful and hostile environments on earth, Rise of the Tomb Raider delivers cinematic survival action-adventure.",
        "stock": 45,
        "price": 36
    },
    {
        "platform": [
            "Xbox 360"
        ],
        "genre": [
            "Fighting"
        ],
        "image": [
            "co1lig.jpg"
        ],
        "companies": [
            "Capcom",
            "Eighting"
        ],
        "screenshots": [
            "jvhqddyrbuac34aiar06.jpg",
            "ahna8tqiq2weur8au0ej.jpg",
            "ol8kownqcguweeqgh6yj.jpg",
            "ayqkzgrmnyb4qazmvq3t.jpg",
            "d3mr9u6mt1pfbwctpbwq.jpg"
        ],
        "similars": [
            "Mortal Kombat",
            "Street Fighter X Tekken",
            "Tekken",
            "Tekken 2",
            "Tekken 3",
            "Tekken 5",
            "The Amazing Spider-Man 2",
            "Spider-Man: Web of Shadows",
            "Marvel vs. Capcom 2: New Age of Heroes",
            "Marvel vs. Capcom 4"
        ],
        "category": "On sale",
        "_id": "5da82a818e46ee7ac05a119c",
        "name": "Ultimate Marvel vs. Capcom 3",
        "release": "15/11/2011",
        "description": "Ultimate Marvel vs. Capcom 3 is a crossover fighting game developed by Capcom in collaboration with Eighting. It is an updated version of Marvel vs. Capcom 3: Fate of Two Worlds. The game features characters from both Capcom's video game franchises and comic book series published by Marvel Comics. The game was released in November 2011 for the PlayStation 3 and Xbox 360, and was featured as a launch title for the PlayStation Vita in 2012. \n \nIn Ultimate Marvel vs. Capcom 3, players select a team of three characters to engage in combat and attempt to knock out their opponents. As an update, the game utilizes largely identical gameplay mechanics to the original. However, both the aerial combat and X-Factor systems, introduced in Fate of Two Worlds, have received adjustments. In addition to gameplay modifications and new playable characters, the game features several aesthetic changes. \n \nAfter the events of the 2011 Tōhoku earthquake and tsunami disrupted the development schedule for downloadable content for Fate of Two Worlds, the additional content was created into a standalone title, Ultimate Marvel vs. Capcom 3, for a discounted retail price. The game received generally positive reviews upon release; critics praised the expanded character roster and improved online experience, but criticized the lack of new features and game modes.",
        "stock": 30,
        "price": 20
    },
    {
        "platform": [
            "PlayStation 2"
        ],
        "genre": [
            "Fighting"
        ],
        "image": [
            "co1rsq.jpg"
        ],
        "companies": [
            "Namco Hometek",
            "Sony Computer Entertainment, Inc. (SCEI)",
            "Namco"
        ],
        "screenshots": [
            "tglnbzknzjfsqnxxkjen.jpg",
            "lp1rsb7sz9dmf1oru3dw.jpg",
            "l44gurity7g7rigtyboz.jpg",
            "j3x6sc4zjgnztgp0oeau.jpg",
            "je7wlrt8g364wb9fafmk.jpg"
        ],
        "similars": [
            "Tekken Advance",
            "Tekken",
            "Tekken 2",
            "Tekken 4",
            "Tekken 5",
            "Tekken 6",
            "Tekken Tag Tournament",
            "Soul Edge",
            "Mortal Kombat 3",
            "Ultimate Mortal Kombat 3"
        ],
        "category": "On sale",
        "_id": "5da82ace8e46ee7ac05a119d",
        "name": "Tekken 3",
        "release": "22/3/1997",
        "description": "Tekken 3 maintains the same core fighting system and concept as its predecessors, but brings many improvements, such as significantly more detailed graphics and animations, fifteen new characters added to the game's roster, more modern music and faster and more fluid gameplay. \nPerhaps the most noticeable change from Tekken 2 fight system is movement reform - whereas the element of depth had been largely insignificant in previous Tekken games (aside from some characters having unique sidesteps and dodging maneuvers), Tekken 3 added emphasis on the third axis, allowing all characters to sidestep in or out of the background by lightly pressing the arcade stick (or tapping the controller button in the console version) towards the corresponding direction. Another big change in movement was that jumping was toned down, no longer allowing fighters to jump to extreme heights (as was present in previous games), but keeping leaps to reasonable, realistic heights. It made air combat more controllable, and put more use to sidestep dodges, as jumping no longer became a universal dodge move that was flying above all of the ground moves. Other than that, the improved engine allowed for quick recoveries from knock-downs, more escapes from tackles and stuns, better juggling (as many old moves had changed parameters, allowing them to connect in combo-situations, where they wouldn't connect in previous games) and extra newly created combo throws. \n \nTekken 3 was the first Tekken to feature a beat 'em up minigame called \"Tekken Force\", which pitted the player in various stages against enemies in a side-scrolling fashion. If the player succeeds in beating the minigame four times, Dr. Bosconovitch would be a playable character (granted that you defeat him first). This was continued in Tekken 4 and succeeded by the Devil Within minigame in Tekken 5 - but Boskonovitch was dropped as a playable character after Tekken 3. There is also a minigame \"Tekken Ball\", similar to beach volleyball, where one has to hit the ball with a powerful attack to hurt the opponent or try to hit the ball in such a way that it hits the ground in the opponent's area, thus causing damage.",
        "stock": 30,
        "price": 12
    },
    {
        "platform": [
            "Wii U"
        ],
        "genre": [
            "Strategy",
            "Hack and slash/Beat 'em up"
        ],
        "image": [
            "co1p96.jpg"
        ],
        "companies": [
            "Nintendo",
            "Team Ninja",
            "Omega Force",
            "Koei Tecmo Games Co., Ltd."
        ],
        "screenshots": [],
        "similars": [
            "The Legend of Zelda: Skyward Sword",
            "The Legend of Zelda: A Link to the Past",
            "The Legend of Zelda: Ocarina of Time",
            "The Legend of Zelda: Twilight Princess",
            "The Legend of Zelda: The Wind Waker HD",
            "The Legend of Zelda: A Link Between Worlds",
            "Batman: Arkham Knight",
            "Tales of Zestiria",
            "Bloodborne",
            "The Legend of Zelda: Breath of the Wild"
        ],
        "category": "On sale",
        "_id": "5da82b898e46ee7ac05a119e",
        "name": "Hyrule Warriors",
        "release": "14/8/2014",
        "description": "A Legendary Pairing: Cut down entire legions of enemies as Link, Zelda, Midna and other characters from The Legend of Zelda franchise using over-the-top powerful Dynasty Warriors-style moves. This tour de force through the beloved locales of Hyrule will have players battling some of the fiercest enemies in The Legend of Zelda history. Two players can play local co-op, with one player joining with the Wii U GamePad controller and another with the Wii U Pro Controller or Wii Remote and Nunchuk controllers.",
        "stock": 32,
        "price": 23
    },
    {
        "platform": [
            "Wii U"
        ],
        "genre": [
            "Adventure",
            "Hack and slash/Beat 'em up"
        ],
        "image": [
            "co1p92.jpg"
        ],
        "companies": [
            "Nex Entertainment",
            "Platinum Games",
            "Nintendo",
            "Bee Tribe",
            "Sega"
        ],
        "screenshots": [],
        "similars": [
            "Bayonetta 2",
            "Ori and the Blind Forest",
            "Get Even",
            "Endless Legend",
            "Aarklash: Legacy",
            "This is the Police",
            "Hollow Knight",
            "Momodora: Reverie Under the Moonlight",
            "Children of Morta",
            "Dream Alone"
        ],
        "category": "On sale",
        "_id": "5da82bc48e46ee7ac05a119f",
        "name": "Bayonetta",
        "release": "29/10/2009",
        "description": "A member of an ancient witch clan and possessing powers beyond the comprehension of mere mortals, Bayonetta faces-off against countless angelic enemies, many reaching epic proportions, in a game of 100% pure, unadulterated all-out action. Outlandish finishing moves are performed with balletic grace as Bayonetta flows from one fight to another. With magnificent over-the-top action taking place in stages that are a veritable theme park of exciting attractions, Bayonetta pushes the limits of the action genre, bringing to life its fast-paced, dynamic climax combat.",
        "stock": 20,
        "price": 20
    },
    {
        "platform": [
            "Nintendo 3DS"
        ],
        "genre": [
            "Adventure",
            "Shooter"
        ],
        "image": [
            "co1p9f.jpg"
        ],
        "companies": [
            "Capcom"
        ],
        "screenshots": [],
        "similars": [
            "Rogue Warrior",
            "Max Payne 3",
            "The Last of Us",
            "Wolfenstein: The New Order",
            "Call of Duty: Ghosts",
            "Dying Light",
            "Murdered: Soul Suspect",
            "Enemy Front",
            "The Cat Lady",
            "Watch Dogs 2"
        ],
        "category": "On sale",
        "_id": "5da82c168e46ee7ac05a11a0",
        "name": "Resident Evil: Revelations",
        "release": "26/1/2012",
        "description": "The original version of Resident Evil: Revelations. \nThough they typically use the same name, an HD version/edition was released for consoles and on PC in 2013, after it's success on the 3DS platform. \nThe updated version was also released for the PlayStation 4 and Xbox One in 2017 with a release on the Nintendo Switch a couple months later. \n \nThe critically acclaimed survival horror title takes players back to the events that took place between Resident Evil 4 and Resident Evil 5, revealing the truth about the T-Abyss virus. Resident Evil Revelations features series favorites Jill Valentine and Chris Redfield, plus their respective BSAA partners - Parker Luciani and Jessica Sherawat. The action begins on board a supposedly abandoned cruise ship, the ‘Queen Zenobia’, where horrors lurk around every corner, before players head for the mainland and the devastated city of Terragrigia. With limited ammo and weapons available, the race is on to survive the horror of Resident Evil Revelations.",
        "stock": 45,
        "price": 15
    },
    {
        "platform": [
            "PlayStation 2"
        ],
        "genre": [
            "Role-playing (RPG)",
            "Sport"
        ],
        "image": [
            "co1o5w.jpg"
        ],
        "companies": [
            "Jupiter Corporation",
            "h.a.n.d., Inc.",
            "Disney Interactive Studios",
            "Square Enix"
        ],
        "screenshots": [
            "uoix16gmydzm8o5yyzax.jpg"
        ],
        "similars": [
            "Final Fantasy IX",
            "Final Fantasy VIII",
            "Kingdom Hearts: Chain of Memories",
            "Ni no Kuni: Wrath of the White Witch",
            "Kingdom Hearts III",
            "Jade Empire",
            "Eternal Sonata",
            "Persona 5",
            "Rogue Galaxy",
            "Kingdom Hearts Re:Chain of Memories"
        ],
        "category": "On sale",
        "_id": "5da82c4b8e46ee7ac05a11a1",
        "name": "Kingdom Hearts",
        "release": "28/3/2002",
        "description": "The premise of Kingdom Hearts is designed around traveling to a collection of levels that are both original designs, and based on various Disney stories, referred to in-game as \"Worlds\". The Worlds are populated by NPC's, based on relevant characters from the corresponding Disney story, for example, the World based on Disney's Alice in Wonderland features appearances by Alice, the White Rabbit, and the Queen of Hearts. Interacting with these characters forms part of gameplay, while combating the games enemies, the \"Heartless\" forms the other. \n \nSuccessful completion of a World is accomplished by defeating a key foe, which is either the primary villain from the Disney story, a unique Heartless of particular strength, or a combination thereof. Each world has a key foe which must be defeated, although there are many mini-bosses, side quests and treasures to be found that contribute to character progression within the game, and give bonuses for their completion in the form of weapons, items, and bonus scenes. \n \nThe game uses an experience based progression system, with experience gained by defeating foes. Experience gained rises in relation to the strength of the foe, and is consistent for each enemy over the course of the game. Levels are gained with experience, and provide increases to stat attributes in strength, defence, magic, hit points, magic points and ability points, with a new, predetermined ability unlocked approximately every four levels. Enemies also drop a combination of four types of reward upon death, green orbs that replenish HP, blue, translucent bubbles that replenish MP, yellow diamonds that contribute funds to the in-game currency \"Munny\", and tiny chests that when picked up, add a item to the players inventory based on the foe defeated. Such items include those used to restore HP and MP, items to aid party members or synthesis materials which can be used to create weapons and armor.",
        "stock": 30,
        "price": 18
    }
]


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
