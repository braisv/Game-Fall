// auth/auth-service.js
import axios from "axios";

export default class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/auth`,
      withCredentials: true,
    });
  }

  signup = (username, password, name, surname, email, phone) => {
    return this.service.post("/signup", { username, password, name, surname, email, phone }).then((response) => response.data);
  };

  login = (username, password) => {
    console.log("service data: ", { username, password });
    return this.service.post("/login", { username, password }).then((response) => response.data);
  };

  loggedin = () => {
    return this.service.get("/currentuser").then((response) => response.data);
  };

  logout = () => {
    return this.service
      .get("/logout")
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log("ERROR LOGOUT", err));
  };
}
