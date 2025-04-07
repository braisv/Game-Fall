const axios = require("axios");
require("dotenv").config();

const api_url = "https://api.igdb.com/v4";
const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  "Client-ID": process.env.TWITCH_APP_CLIENT_ID,
};

const sendApiCall = async (endpoint, data) => {
  try {
    const response = await axios({
      url: `${api_url}/${endpoint}`,
      method: "POST",
      headers,
      data,
    });
    console.log({ response });
    if ((response.status = 200)) {
      console.log("SUCCESSFULL CALL: ", { status: response.status });
    } else {
      console.log("FAILED CALL: ", { response });
    }
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

class APIHandler {
  async searchGamesByName(gameName) {
    const endpoint = "games";
    const data = `fields name,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url; search "${gameName}"; limit 50;`;

    return await sendApiCall(endpoint, data);
  }

  async getGame(gameId) {
    const endpoint = "games";
    const data = `fields name,release_dates.date,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url,genres.name,summary,screenshots.url,screenshots.height,screenshots.width,screenshots.image_id,keywords.name,collection.name,franchise.name,involved_companies.company.name,similar_games.name; where id=${gameId};`;

    return await sendApiCall(endpoint, data);
  }
}

module.exports = APIHandler;
