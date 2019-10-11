import React, { Component } from 'react'
import axios from 'axios'
import './NewGame.css'
import GameService from '../../utils/GameService'
import './NewGame.css'

export default class NewGame extends Component {
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
      genre: [],
      image: [],
      description: "",
      companies: [],
      screenshots: [],
      similars: [],
      price: {
        amount: "",
        discountInfo: {
          discount: "",
          dateFrom: Date,
          dateTo: Date
        },
        taxes: ""
      },
      category: {
        type: "",
        enum: ["New", "On sale", "Recommended"]
      },
      stock: {
        quantity: "",
        minQuantity: ""
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeForArray = (e, idx) => {
    let screenshots = [...this.state.screenshots]
    screenshots[idx] = e.target.value

    this.setState({
      ...this.state,
      screenshots: screenshots
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let { name, platform, release, genre, image, description, companies, screenshots, similars } = this.state

    let price = {
      amount: this.state.price.amount,
      // discountInfo: {
      //   discount: this.state.price.discountInfo.discount,
      //   dateFrom: this.state.price.discountInfo.dateFrom,
      //   dateTo: this.state.price.discountInfo.dateTo
      // },
      // taxes: this.state.price.taxes
    }

    let category = {
      type: this.state.category,
      // minQuantity: this.state.category.minQuantity,
      // releaseDate: this.state.category.releaseDate
    }

    let stock = {
      quantity: this.state.stock.quantity,
      // minQuantity: this.state.stock.minQuantity
    }


    axios.post(`http://localhost:5000/new`, { name, platform, release, genre, image, description, companies, screenshots, similars, price, category, stock })
      .then(() => {
        this.setState({
          name: "",
          platform: [],
          release: "",
          genre: [],
          image: [],
          description: "",
          companies: [],
          screenshots: [],
          similars: [],
          price: {
            amount: "",
            discountInfo: {
              discount: "",
              dateFrom: Date,
              dateTo: Date
            },
            taxes: ""
          },
          category: {
            type: "",
            enum: ["New", "On sale", "Recommended"]
          },
          stock: {
            quantity: "",
            minQuantity: "",
            releaseDate: Date

          }
        });
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
        console.log(response)
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
    return (
      <div className='form-section flex-column'>
        {this.state.selectedGame}
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
          <input
            id="inputName"
            type="text"
            label="Name"
            onChange={e => this.handleChange(e)}
            name='name'
            placeholder='Name of the Game'
            value={this.state.name}
          />
          <input
            id="inputCompanies"
            type="text"
            label="Companies"
            onChange={e => this.handleChange(e)}
            name='companies'
            placeholder='Companies'
            value={this.state.companies[0]}
          />
          <input
            id="inputCompanies"
            type="text"
            label="Companies"
            onChange={e => this.handleChange(e)}
            name='companies'
            placeholder='Companies'
            value={this.state.companies[1]}
          />
          <input
            id="inputCompanies"
            type="text"
            label="Companies"
            onChange={e => this.handleChange(e)}
            name='companies'
            placeholder='Companies'
            value={this.state.companies[2]}
          />
          <input
            id="inputRelease"
            type="text"
            label="Release"
            onChange={e => this.handleChange(e)}
            name='release'
            placeholder='Release date'
            value={this.state.release}
          />
          <input
            id="inputGenre"
            type="text"
            label="Genre"
            onChange={e => this.handleChange(e)}
            name='genre'
            placeholder='Genre'
            value={this.state.genre}
          />
          <select onChange={e => this.handleChange(e)}>
            {this.state.platform.map(plat => (
              <option value={plat}>{plat}</option>
            ))}
          </select>
          <input
            id="inputImage"
            type="text"
            label="Image"
            onChange={e => this.handleChange(e)}
            name='image'
            placeholder='Image URL'
            value={this.state.image}
          />
          <input
            id="inputDescription"
            type="text"
            label="Description"
            onChange={e => this.handleChange(e)}
            name='description'
            placeholder='Summary'
            value={this.state.description}
          />
          <input
            id="inputSimilars1"
            type="text"
            label="Similar Games"
            onChange={e => this.handleChange(e)}
            name='similars'
            placeholder='Similar Games'
            value={this.state.similars[0]}
          />
          <input
            id="inputSimilars2"
            type="text"
            label="Similar Games"
            onChange={e => this.handleChange(e)}
            name='similars'
            placeholder='Similar Games'
            value={this.state.similars[1]}
          />
          <input
            id="inputSimilars3"
            type="text"
            label="Similar Games"
            onChange={e => this.handleChange(e)}
            name='similars'
            placeholder='Similar Games'
            value={this.state.similars[2]}
          />
          <input
            id="inputScreenshots1"
            type="text"
            label="Screenshots"
            onChange={e => this.handleChange(e)}
            name='screenshots'
            placeholder='Screenshot'
            value={this.state.screenshots[0]}
          />
          <input
            id="inputScreenshots2"
            type="text"
            label="Screenshots"
            onChange={e => this.handleChange(e)}
            name='screenshots'
            placeholder='Screenshot'
            value={this.state.screenshots[1]}
          />
          <input
            id="inputScreenshots3"
            type="text"
            label="Screenshots"
            onChange={e => this.handleChange(e)}
            name='screenshots'
            placeholder='Screenshot'
            value={this.state.screenshots[2]}
          />

          <input
            id="inputScreenshots4"
            type="text"
            label="Screenshots"
            onChange={e => this.handleChange(e)}
            name='screenshots'
            placeholder='Screenshot'
            value={this.state.screenshots[3]}
          />
          <input
            id="inputScreenshots5"
            type="text"
            label="Screenshots"
            onChange={e => this.handleChange(e)}
            name='screenshots'
            placeholder='Screenshot'
            value={this.state.screenshots[4]}
          />
          <input
            id="inputPrice"
            type="number"
            label="Price"
            onChange={e => this.handleChange(e)}
            name='price'
            placeholder='...$'
            value={this.state.price.amount}
          />
          <input
            id="inputQuantity"
            type="number"
            label="Quantity"
            onChange={e => this.handleChange(e)}
            name='quantity'
            placeholder='Units'
            value={this.state.stock.quantity}
          />
          <select onChange={e => this.handleChange(e)}>
            <option value='On Sale'>On Sale</option>
            <option value='Recommended'>Recommended</option>
            <option value='New'>New</option>
          </select>
          <button type="submit" value="Submit" >Submit</button>
        </form>
      </div>
    )
  }
}
