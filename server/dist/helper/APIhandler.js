"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = require("../utils/AppError");
const types_1 = require("../utils/types");
dotenv_1.default.config();
const api_url = 'https://api.igdb.com/v4';
const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    'Client-ID': process.env.TWITCH_APP_CLIENT_ID,
};
const sendApiCall = async (endpoint, data) => {
    try {
        const response = await (0, axios_1.default)({
            url: `${api_url}/${endpoint}`,
            method: 'POST',
            headers,
            data,
        });
        return response;
    }
    catch (err) {
        throw new AppError_1.BaseError('IGDB api failure', types_1.StatusCode.serverError);
    }
};
class APIHandler {
    async searchGamesByName(gameName) {
        const endpoint = 'games';
        const data = `fields name,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url; search "${gameName}"; limit 50;`;
        return await sendApiCall(endpoint, data);
    }
    async getGame(gameId) {
        const endpoint = 'games';
        const data = `fields name,release_dates.date,platforms.platform_type.name,platforms.platform_family.name,platforms.platform_logo.url,platforms.platform_logo.width,platforms.platform_logo.height,cover.url,genres.name,summary,screenshots.url,screenshots.height,screenshots.width,screenshots.image_id,keywords.name,collection.name,franchise.name,involved_companies.company.name,similar_games.name; where id=${gameId};`;
        return await sendApiCall(endpoint, data);
    }
}
exports.default = APIHandler;
//# sourceMappingURL=APIhandler.js.map