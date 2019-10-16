import axios from "axios";

export default class UserService {
  constructor() {
    this.URL = `${process.env.REACT_APP_API_URL}/api/user`;
    this.service = axios.create({
      baseURL: this.URL,
      withCredentials: true
    });
  }

  getUser = id => {
    return this.service.get("/" + id).then(response => response.data);
  };

  updateUser = updatedUserObj => {
    return this.service
      .post(`/update`, {updatedUserObj})
      .then(response => response.data);
  };

  handleUpload(theFile) {
    return this.service.post("/upload", theFile).then(res => res.data);
  }

  selectedGames = () => {
    return this.service.get("/cart")
      .then(response => response.data)
      .catch(err => console.log('ERROR FROM SERVICE', err))
  }
}