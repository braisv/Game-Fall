import axios from "axios";

export default class UserService {
  constructor() {
    this.URL = "http://localhost:5000/api/user";
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
      .put("/update/" + updatedUserObj.id, updatedUserObj)
      .then(response => response.data);
  };

  handleUpload(theFile) {
    return this.service.post("/upload", theFile).then(res => res.data);
  }
}