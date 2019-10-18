import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import './Shop.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";

export default class Shop extends Component {
  constructor() {
    super()
    this.state = {
      games: '',
      search: '',
      filteredGames: '',
      ascendingSort: false,
      ascendingPrice: false,
      selectedPlatform: "",
      selectedGenre: "",
      platforms: [],
      genres: []
    }
  }

  updateSearch(e) {
    let search = e.target.value

    this.setState({
      ...this.state,
      search: search
    })
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/games`)
      .then(({ data }) => {
        this.setState({ games: data })
      })
      .catch(error => {
        console.log(error)
      }).then(() => {
        let allThePlatforms = [].concat(...this.state.games.map(game => game.platform))
        let filterPlatforms = [...new Set(allThePlatforms)]

        let allTheGenres = [].concat(...this.state.games.map(game => game.genre))
        let filterGenres = [...new Set(allTheGenres)]

        this.setState({
          platforms: filterPlatforms,
          genres: filterGenres,
          filteredGames: this.state.games
        })
      })
  }

  sortByName = () => {
    if (!this.state.ascendingSort || this.state.ascendingSort === "up") {
      this.setState({
        ...this.state,
        games: this.state.games
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            return -1;
          }),
        ascendingSort: "down",
        ascendingPrice: null
      })
    } else {
      this.setState({
        ...this.state,
        games: this.state.games
          .sort((a, b) => {
            if (a.name > b.name) return -1;
            return 1;
          }),
        ascendingSort: "up",
        ascendingPrice: null
      })
    }
  }

  sortByPrice = () => {
    if (!this.state.ascendingPrice || this.state.ascendingPrice === "up") {
      this.setState({
        ...this.state,
        games: this.state.games
          .sort((a, b) => {
            if (a.price > b.price) return 1;
            return -1;
          }),
        ascendingPrice: "down",
        ascendingSort: null
      })
    } else {
      this.setState({
        ...this.state,
        games: this.state.games
          .sort((a, b) => {
            if (a.price > b.price) return -1;
            return 1;
          }),
        ascendingPrice: "up",
        ascendingSort: null
      })
    }
  }

  sortByPlatform = () => {
    let filterGames = this.state.filteredGames.filter(game => game.platform == this.state.selectedPlatform)
    if (filterGames.length === 0) filterGames = this.state.filteredGames

    this.setState({
      ...this.state,
      games: this.state.filteredGames
    })

    this.setState({
      ...this.state,
      games: filterGames
    })
  }

  sortByGenre = () => {
    let filterGames = this.state.filteredGames.filter(game => game.genre.includes(this.state.selectedGenre))
    if (filterGames.length === 0) filterGames = this.state.filteredGames

    this.setState({
      ...this.state,
      games: this.state.filteredGames
    })

    this.setState({
      ...this.state,
      games: filterGames
    })
  }

  updatePlatform = (e) => {
    let platform = e.target.value

    this.setState({
      ...this.state,
      selectedPlatform: platform
    })
  }

  updateGenre = (e) => {
    let genre = e.target.value

    this.setState({
      ...this.state,
      selectedGenre: genre
    })
  }

  render() {
    const { games } = this.state
    let resultSearch = games

    if (!!resultSearch) {
      resultSearch = games.filter(el => el.name.toLowerCase().includes(this.state.search.toLowerCase()))
      resultSearch = resultSearch.map(game => {
        return (
          <Link to={`/game/${game._id}`} className="shop-list">
            <div class="shop-item">
              <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image[0]}`} alt="Cover game" />
              <div className="item-title"><h3>{game.name}</h3>
                <div className="price-item">{game.price} €</div>
              </div>
            </div>
          </Link>
        )
      })
    }

    let addGame = null
    if (this.props.userInSession.role === "ADMIN") {
      addGame = (
        <div className="flex addGame">
          <Link className='link' to="/addgame"><button>+</button></Link>
        </div>
      )
    }

    let arrow = null
    if (this.state.ascendingSort === "down") {
      arrow = (<FontAwesomeIcon size="sm" icon={faArrowCircleDown} />)
    } else if (this.state.ascendingSort === "up") {
      arrow = (<FontAwesomeIcon size="sm" icon={faArrowCircleUp} />)
    } else {
      arrow = null
    }

    let arrowPrice = null
    if (this.state.ascendingPrice === "down") {
      arrowPrice = (<FontAwesomeIcon size="sm" icon={faArrowCircleDown} />)
    } else if (this.state.ascendingPrice === "up") {
      arrowPrice = (<FontAwesomeIcon size="sm" icon={faArrowCircleUp} />)
    } else {
      arrowPrice = null
    }

    if (!games) return <div className="spinner"><div class="lds-hourglass"></div></div>
    return (
      <div className="shop-container flex-column">
        <div className="platform-filter filters flex-column">
          <form className='searchBar'>
            {addGame}
            <input type="search" name="search" id="search" placeholder='Search game' value={this.state.search} onChange={e => this.updateSearch(e)} />
          </form>
          <div className="flex small-filters">
            <select name="platform" id="platform-filter" selected="Select a platform" onChange={e => this.updatePlatform(e)}>
              <option value="Select a platform">All the platforms</option>
              {this.state.platforms.map(plat => (
                <option value={plat}>{plat}</option>
              ))}
            </select>
            <button onClick={this.sortByPlatform}>Sort</button>
            <select name="genre" id="genre-filter" selected="Genre" onChange={e => this.updateGenre(e)}>
              <option value="Genre">Genres</option>
              {this.state.genres.map(plat => (
                <option value={plat}>{plat}</option>
              ))}
            </select>
            <button onClick={this.sortByGenre}>Sort</button>
            <button onClick={this.sortByName}>{arrow} Sort by Name</button>
            <button onClick={this.sortByPrice}>{arrowPrice} Sort by Price</button>
          </div>
        </div>
        <div className='gameList'>
          <div class="form-section flex">
            {resultSearch}
          </div>
        </div>
      </div>
    )
  }
}
