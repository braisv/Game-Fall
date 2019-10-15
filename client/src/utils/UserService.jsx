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
      .put("/update" + updatedUserObj.id, updatedUserObj)
      .then(response => response.data);
  };

  handleUpload(theFile) {
    return this.service.post("/upload", theFile).then(res => res.data);
  }

  // selectedGames = (userId) => {
  //   return this.service.get('/selectedgames', { userId })
  //     .then(response => console.log(response.data))
  //     .catch(err => console.log(err.res.data))
  // }
}