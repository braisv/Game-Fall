import axios from "axios";

export default class GameService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/db`,
      withCredentials: true,
    });
  }

  search = (query) => {
    return this.service.get(`/search?query=${query}`, { query }).then((response) => response.data);
  };

  game = (id) => {
    return this.service.get(`/game/${id}`).then((response) => response.data[0]);
  };
}
