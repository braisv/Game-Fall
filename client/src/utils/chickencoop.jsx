// auth/auth-service.js
import axios from 'axios';

class ChickeCoop {
  constructor() {
    this.service = axios.create({
      baseURL: 'https://chicken-coop.fr/rest/games?'
    });
  }

  gameInfo = (username, password) => {
    return this.service.post('/signup', {username, password})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}