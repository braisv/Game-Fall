// auth/auth-service.js
import axios from 'axios';

export default class GameService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:5000/api/db',
      withCredentials: true
    });
  }

  search = (query) => {
    return this.service.get(`/search?query=${query}`, {query})
      .then(response => response.data)
  }

  game = () => {
    return this.service.get('/game/:id')
      .then(response => response.data)
  }

  genres = () => {
    return this.service.get('/genres/:id')
      .then(response => response.data)
  }

  platforms = () => {
    return this.service.get('/platforms/:id')
      .then(response => response.data)
  }

  screenshots = () => {
    return this.service.get('/screenshots/:id')
      .then(response => response.data)
  }

  collections = () => {
    return this.service.get('/collections/:id')
      .then(response => response.data)
  }

  covers = () => {
    return this.service.get('/covers/:id')
      .then(response => response.data)
  }

  franchises = () => {
    return this.service.get('/franchises/:id')
      .then(response => response.data)
  }

  companies = () => {
    return this.service.get('/companies/:id')
      .then(response => response.data)
  }

  similars = () => {
    return this.service.get('/similars/:id')
      .then(response => response.data)
  }

  // login = (username, password) => {
  //   return this.service.get('/login', { username, password })
  //     .then(response => response.data)
  // }
}