import axios from 'axios';
declare class APIHandler {
    searchGamesByName(gameName: string): Promise<axios.AxiosResponse<any, any>>;
    getGame(gameId: string): Promise<axios.AxiosResponse<any, any>>;
}
export default APIHandler;
