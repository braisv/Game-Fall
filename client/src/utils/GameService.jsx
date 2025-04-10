import axios from "axios";

export default class GameService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/db`,
      withCredentials: true,
    });
  }

  search = (query) => {
    return this.service.get(`/search?query=${query}`, { query }).then((response) => {
      const { data, status } = response.data || {};

      if (status === "success") {
        return data;
      }

      return [];
    });
  };

  game = (id) => {
    return this.service.get(`/game/${id}`).then((response) => {
      const { data, status } = response.data || {};
      console.log({ data, status });
      if (status === "success") {
        return data;
      }

      return undefined;
    });
  };
}
