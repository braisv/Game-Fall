import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import './NewGame.css'
import GameService from '../../utils/GameService'
import './NewGame.css'

class NewGame extends Component {
  constructor() {
    super()
    this.service = new GameService();
    this.state = {
      search: '',
      gamesFound: [],
      selectedGame: '',
      name: "",
      platform: [],
      release: "",
      genre: "",
      image: "",
      description: "",
      companies: "",
      screenshots: [],
      similars: "",
      price: 0,
      category: "On sale",
      stock: 0,
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeSelect(e) {
    this.setState({
      platform: [e.target.value]
    })
  }

  handleChangeForArray = (e, idx) => {
    let screenshots = [...this.state.screenshots]
    screenshots[idx] = e.target.value

    this.setState({
      ...this.state,
      screenshots: screenshots
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    let { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price } = this.state

    axios.post(`${process.env.REACT_APP_API_URL}/new`, { name, platform, release, genre, image, description, companies, screenshots, similars, category, stock, price })
      .then(() => {
        this.setState({
          name: "",
          platform: [],
          release: "",
          genre: "",
          image: "",
          description: "",
          companies: "",
          screenshots: [],
          similars: "",
          price: 0,
          category: "On sale",
          stock: 0,
        });
        this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }

  updateSearch(e) {
    let search = e.target.value

    this.setState({
      ...this.state,
      search: search
    })
  }

  searchFormSubmit = (event) => {
    event.preventDefault();
    const search = this.state.search;

    this.service.search(search)
      .then(response => {
        this.setState({
          gamesFound: response,
          search: search
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          search: search
        });
      })
  }

  setSelectedGame(id) {
    this.setState({
      ...this.state,
      selectedGame: id
    })

    this.service.platforms(id)
      .then(response => {
        this.setState({
          ...this.state,
          name: response.name,
          platform: response.platforms,
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          name: ''
        });
      })

    this.service.genres(id)
      .then(response => {
        this.setState({
          ...this.state,
          release: response.first_release_date,
          genre: response.genres,
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          genres: ''
        });
      })

    this.service.covers(id)
      .then(response => {
        this.setState({
          ...this.state,
          image: response.cover,
          description: response.summary
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          covers: ''
        });
      })

    this.service.screenshots(id)
      .then(response => {
        this.setState({
          ...this.state,
          screenshots: response.screenshots,
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          screenshots: ''
        });
      })

    this.service.companies(id)
      .then(response => {
        this.setState({
          ...this.state,
          companies: response.involved_companies
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          companies: ''
        });
      })

    this.service.similars(id)
      .then(response => {
        this.setState({
          ...this.state,
          similars: response.similar_games
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          similars: ''
        });
      })
  }

  render() {

    let img
    if (!!this.state.image) {
      img = `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${this.state.image}`
    } else {
      img = '#'
    }

    return (
      <div className='form-section flex-column'>
        <form onSubmit={this.searchFormSubmit} className='searchBar'>
          <input type="search" name="search" id="search" placeholder='Search game' value={this.state.search} onChange={e => this.updateSearch(e)} />
        </form>
        <div className="searchResults flex">
          {this.state.gamesFound.map((game, i) => (
            <div className="linked">
              <div key={i} className="gameCardSmall" onClick={() => this.setSelectedGame(game.id)}>
                {/* <div className="image-section">
            <l i>

              <img src={game.image_url} alt='#' />
            </l>
          </div> */}
                <div className="description-section">
                  <h1>{game.name}</h1>
                  {/* <p>{game.cover}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={this.handleFormSubmit}>

          <div className="parent">
            <div className="div1 flex-column">
              <label for='name'>Name:</label>
              <input
                id="inputName"
                type="text"
                label="Name"
                onChange={e => this.handleChange(e)}
                name='name'
                placeholder='Name of the Game'
                value={this.state.name}
              />
            </div>
            <div className="div2 flex-column">
              <label for='image'>Image:</label>
              <input
                id="inputImage"
                type="text"
                label="Image"
                onChange={e => this.handleChange(e)}
                name='image'
                placeholder='Image URL'
                value={this.state.image}
              />

              <img src={img} alt="Cover game" />
            </div>
            <div className="div3 flex-column">
              <label>Platform:</label>
              <select onChange={this.handleChangeSelect.bind(this)} >
                {this.state.platform.map(plat => (
                  <option value={plat}>{plat}</option>
                ))}
              </select>
            </div>
            <div className="div4 flex-column">
              <label for='genre'>Genre:</label>
              <input
                id="inputGenre"
                type="text"
                label="Genre"
                onChange={e => this.handleChange(e)}
                name='genre'
                placeholder='Genre URL'
                value={this.state.genre}
              />
            </div>
            <div className="div5 flex-column">
              <label for='release'>Release date:</label>
              <input
                id="inputRelease"
                type="text"
                label="Release"
                onChange={e => this.handleChange(e)}
                name='release'
                placeholder='Release date'
                value={this.state.release}
              />
            </div>
            <div className="div6 flex-column">
              <label for='summary'>Summary:</label>
              <textarea
                id="inputDescription"
                type="text"
                label="Description"
                onChange={e => this.handleChange(e)}
                name='description'
                placeholder='Summary'
                value={this.state.description}
              />
            </div>
            <div className="div7 flex-column">
              <input
                id="inputCompanies"
                type="text"
                label="Companies"
                onChange={e => this.handleChange(e)}
                name='companies'
                placeholder='Companies'
                value={this.state.companies}
              />
            </div>
            <div className="div8 flex-column">
              <label for='similars'>Similar games:</label>
              <input
                id="inputSimilars1"
                type="text"
                label="Similar Games"
                onChange={e => this.handleChange(e)}
                name='similars'
                placeholder='Similar Games'
                value={this.state.similars}
              />
            </div>
            <div className="div9 flex-column">
              <label for='screenshots'>Screenshots:</label>
              <input
                id="inputScreenshots1"
                type="text"
                label="Screenshots"
                onChange={e => this.handleChange(e)}
                name='screenshots'
                placeholder='Screenshot'
                value={this.state.screenshots}
              />
            </div>
            <div className="div10 flex-column">
              <label>Category:</label>
              <select name='category' value={this.state.category} onChange={e => this.handleChange(e)}>
                <option value='On sale'>On sale</option>
                <option value='Recommended'>Recommended</option>
                <option value='New'>New</option>
              </select>
            </div>
            <div className="div11 flex-column">
              <label for='stock'>Stock:</label>
              <input
                id="inputStock"
                type="number"
                label="Stock"
                onChange={e => this.handleChange(e)}
                name='stock'
                placeholder='Units'
                value={this.state.stock}
              />
            </div>
            <div className="div12 flex-column">
              <label for='price'>Price:</label>
              <input
                id="inputPrice"
                type="number"
                label="Price"
                onChange={e => this.handleChange(e)}
                name='price'
                placeholder='...$'
                value={this.state.price}
              />
            </div>
            <div className="div13 flex-column"> </div>
            <div className="div14 flex-column">
              <button type="submit" value="Submit" >Submit</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


export default withRouter(NewGame);
