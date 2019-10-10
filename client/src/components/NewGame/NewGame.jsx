import React, { Component } from 'react'
import axios from 'axios'
import './NewGame.css'
import { Link } from "react-router-dom";
import GameService from '../../utils/GameService'

export default class NewGame extends Component {
  constructor() {
    super()
    this.service = new GameService();
    this.state = {
      search: '',
      gamesFound: [],
      name: "",
      platform: "",
      release: "",
      genre: [],
      // score: null,
      image: "",
      description: "",
      // developer: "",
      // publisher: [],
      // rating: "",
      // price: {
      //   amount: null,
      //   discountInfo: {
      //     discount: null,
      //     dateFrom: Date,
      //     dateTo: Date
      //   },
      //   taxes: null
      // },
      // category: {
      //   type: "",
      //   enum: ["New", "On sale", "Recommended"]
      // },
      // stock: {
      //   quantity: null,
      //   minQuantity: null,
      //   releaseDate: Date

      // }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    let { name, platform, release, genre, image, description } = this.state

    // let price = {
    //   amount: this.state.price.amount,
    //   discountInfo: {
    //     discount: this.state.price.discountInfo.discount,
    //     dateFrom: this.state.price.discountInfo.dateFrom,
    //     dateTo: this.state.price.discountInfo.dateTo
    //   },
    //   taxes: this.state.price.taxes
    // }

    // let category = {
    //   type: this.state.category.type,
    //   minQuantity: this.state.category.minQuantity,
    //   releaseDate: this.state.category.releaseDate
    // }

    // let stock = {
    //   quantity: this.state.stock.quantity,
    //   minQuantity: this.state.stock.minQuantity,
    //   releaseDate: this.state.stock.releaseDate
    // }


    axios.post(`http://localhost:5000/new`, { name, platform, release, genre, image, description })
      .then(() => {
        this.setState({
          name: "",
          platform: "",
          release: "",
          genre: "",
          image: "",
          description: "",
        });
      })
      .catch(error => console.log(error))
  }

  getGameName = () => {
    const { params } = this.props.match;
    axios
      .get(`http://localhost:5000/single/${params.id}`)
      .then(responseFromApi => {
        const beer = responseFromApi.data;
        console.log(beer);
        this.setState({ beer });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateSearch(e){
    let search = e.target.value
    
    this.setState({
      ...this.state,
      search: search
    }) 
  }

  handleFormSubmit = (event) => {
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

  render() {
    console.log(this.state.search)
    return (
      <div className='form-section'>
        <form onSubmit={this.handleFormSubmit} className='searchBar'>
          <input type="search" name="search" id="search" placeholder='Search game' value={this.state.search} onChange={e => this.updateSearch(e)} />
        </form>
        <div className="searchResults flex">
        {this.state.gamesFound.map(game => (
            <Link to={`/games/${game._id}`} className="linked">
              <div key={game.name} className="gameCardSmall">
                {/* <div className="image-section">
            <li>

              <img src={game.image_url} alt='#' />
            </li>
          </div> */}
                <div className="description-section">
                  <h1>{game.name}</h1>
                  {/* <p>{game.cover}</p> */}
                </div>
              </div>
            </Link>
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
            value=""
          />
          <input
            id="inputPlatform"
            type="text"
            label="Platform"
            onChange={e => this.handleChange(e)}
            name='platform'
            placeholder='Platform'
          />
          <input
            id="inputRelease"
            type="text"
            label="Release"
            onChange={e => this.handleChange(e)}
            name='release'
            placeholder='Release date'
          />
          <input
            id="inputGenre"
            type="text"
            label="Genre"
            onChange={e => this.handleChange(e)}
            name='genre'
            placeholder='Genre'
          />
          <input
            id="inputImage"
            type="text"
            label="Image"
            onChange={e => this.handleChange(e)}
            name='image'
            placeholder='Image URL'
          />
          <input
            id="inputDescription"
            type="text"
            label="Description"
            onChange={e => this.handleChange(e)}
            name='description'
            placeholder='Summary'
          />
          <button type="submit" value="Submit" >Submit</button>
        </form>
      </div>
    )
  }
}
