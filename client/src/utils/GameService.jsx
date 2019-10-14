// auth/auth-service.js
import axios from 'axios';

export default class GameService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api/db`,
      withCredentials: true
    });
  }

  search = (query) => {
    return this.service.get(`/search?query=${query}`, { query })
      .then(response => response.data)
  }

  game = (id) => {
    return this.service.get(`/game/${id}`)
      .then(response => response.data)
  }

  genres = (id) => {
    return this.service.get(`/genres/${id}`)
      .then(response => response.data)
  }

  platforms = (id) => {
    return this.service.get(`/platforms/${id}`)
      .then(response => response.data)
  }


  screenshots = (id) => {
    return this.service.get(`/screenshots/${id}`)
      .then(response => response.data)
  }


  collections = (id) => {
    return this.service.get(`/collections/${id}`)
      .then(response => response.data)
  }


  covers = (id) => {
    return this.service.get(`/covers/${id}`)
      .then(response => response.data)
  }


  franchises = (id) => {
    return this.service.get(`/franchises/${id}`)
      .then(response => response.data)
  }


  companies = (id) => {
    return this.service.get(`/companies/${id}`)
      .then(response => response.data)
  }


  similars = (id) => {
    return this.service.get(`/similars/${id}`)
      .then(response => response.data)
  }


  // login = (username, password) => {
  //   return this.service.get('/login', { username, password })
  //     .then(response => response.data)
  // }
}