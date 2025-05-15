import axios from 'axios';
import dotenv from 'dotenv';
import {BaseError} from '../utils/AppError';
import {StatusCode} from '../utils/types';

dotenv.config();

const api_url = 'https://api.igdb.com/v4';
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  'Client-ID': process.env.TWITCH_APP_CLIENT_ID,
};

const sendApiCall = async (endpoint: string, data: string) => {
  try {
    const response = await axios({
      url: `${api_url}/${endpoint}`,
      method: 'POST',
      headers,
      data,
    });
    return response;
  } catch (err) {
    throw new BaseError('IGDB api failure', StatusCode.serverError);
  }
};

class APIHandler {
  async searchGamesByName(gameName: string) {
    const endpoint = 'games';
    const data = `fields name,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url; search "${gameName}"; limit 50;`;

    return await sendApiCall(endpoint, data);
  }

  async getGame(gameId: string) {
    const endpoint = 'games';
    const data = `fields name,release_dates.date,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url,genres.name,summary,screenshots.url,screenshots.height,screenshots.width,screenshots.image_id,keywords.name,collection.name,franchise.name,involved_companies.company.name,similar_games.name; where id=${gameId};`;

    return await sendApiCall(endpoint, data);
  }
}

export default APIHandler;
