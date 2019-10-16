const axios = require("axios");
require('dotenv').config();

class APIHandler {

  async getName(gameName) {
    let game = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,cover; search "${gameName}"; limit 50;`
    })
    let games = game.data
    return games

  }


  async getGame(gameID) {
    let game = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = game.data[0]


    if (!!finalGame.keywords) {
      let keywordIDs = finalGame.keywords.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/keywords",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${keywordIDs});`
      })
      finalGame.keywords = game.data.map(x => x.name)
    }

    if (!!finalGame.genres) {
      let genreIDs = finalGame.genres.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/genres",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${genreIDs});`
      })
      finalGame.genres = game.data.map(x => x.name)
    }

    let newDate = new Date(finalGame.first_release_date * 1000)
    finalGame.first_release_date = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear()

    if (!!finalGame.platforms) {
      let platformIDs = finalGame.platforms.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/platforms",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${platformIDs});`
      })
      finalGame.platforms = game.data.map(x => x.name)
    }

    if (!!finalGame.screenshots) {
      let screenshotIDs = finalGame.screenshots.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/screenshots",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${screenshotIDs});`
      })
      finalGame.screenshots = game.data.map(x => x.url.substr(44))
    }

    if (!!finalGame.collection) {
      let collectionIDs = finalGame.collection.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/collections",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${collectionIDs});`
      })
      finalGame.collection = game.data.map(x => x.name)
    }

    if (!!finalGame.cover) {
      let coverIDs = finalGame.cover.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/covers",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${coverIDs});`
      })
      finalGame.cover = game.data.map(x => x.url.substr(44))
    }

    if (!!finalGame.franchise) {
      let franchiseIDs = finalGame.franchise.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/franchises",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${franchiseIDs});`
      })
      finalGame.franchise = game.data.map(x => x.name)
    }

    if (!!finalGame.involved_companies) {
      let involved_companiesIDs = finalGame.involved_companies.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/involved_companies",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${involved_companiesIDs});`
      })
      finalGame.involved_companies = game.data.map(x => x.company)

      let companiesIDs = finalGame.involved_companies.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/companies",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${companiesIDs});`
      })
      finalGame.involved_companies = game.data.map(x => x.name)
    }

    if (!!finalGame.similar_games) {
      let similarIDs = finalGame.similar_games.toString()
      game = await axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.API_KEY
        },
        data: `fields *; where id = (${similarIDs});`
      })
      finalGame.similar_games = game.data.map(x => x.name)
    }

    return finalGame
  }

  async getGenres(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let newDate = new Date(finalGame.first_release_date * 1000)
    finalGame.first_release_date = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear()

    let genreIDs = finalGame.genres.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/genres",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${genreIDs});`
    })
    finalGame.genres = response.data.map(x => x.name)
    return finalGame
  }

  async getPlatforms(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let platformIDs = finalGame.platforms.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/platforms",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${platformIDs});`
    })
    finalGame.platforms = response.data.map(x => x.name)
    return finalGame
  }

  async getScreenshots(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let screenshotIDs = finalGame.screenshots.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/screenshots",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${screenshotIDs});`
    })
    finalGame.screenshots = response.data.map(x => x.url.substr(44))
    return finalGame
  }

  async getCollections(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let collectionIDs = finalGame.collection.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/collections",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${collectionIDs});`
    })
    finalGame.collection = response.data.map(x => x.name)
    return finalGame
  }

  async getCovers(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let coverIDs = finalGame.cover.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/covers",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${coverIDs});`
    })
    finalGame.cover = response.data.map(x => x.url.substr(44))
    return finalGame
  }

  async getFranchises(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let franchiseIDs = finalGame.franchise.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/franchises",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${franchiseIDs});`
    })
    finalGame.franchise = response.data.map(x => x.name)
    return finalGame
  }

  async getCompanies(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let involved_companiesIDs = finalGame.involved_companies.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/involved_companies",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${involved_companiesIDs});`
    })
    finalGame.involved_companies = response.data.map(x => x.company)

    let companiesIDs = finalGame.involved_companies.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/companies",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${companiesIDs});`
    })
    finalGame.involved_companies = response.data.map(x => x.name)
    return finalGame
  }

  async getSimilars(gameID) {
    let response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields id,name,first_release_date,platforms,genres,summary,cover,screenshots,keywords,collection,franchise,involved_companies,similar_games; where id=${gameID};`
    })
    let finalGame = response.data[0]

    let similarIDs = finalGame.similar_games.toString()
    response = await axios({
      url: "https://api-v3.igdb.com/games",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'user-key': process.env.API_KEY
      },
      data: `fields *; where id = (${similarIDs});`
    })
    finalGame.similar_games = response.data.map(x => x.name)
    return finalGame
  }
}

module.exports = APIHandler;