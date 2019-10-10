import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import './GameList.css'

export default class GameList extends Component {
  constructor() {
    super()
    this.state = {
      games: '',
      search: ''
    }
  }

  updateSearch(e){
    let search = e.target.value
    
    this.setState({
      ...this.state,
      search: search
    })  
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/games')
      .then(({ data }) => {
        this.setState({ games: data })
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { games } = this.state
    console.log(games)

    // let resultSearch = games.filter(el => el.name.toLowerCase().includes(this.props.filterProducts.toLowerCase()))

    if (!games) return <h1>NO STOCK.</h1>
    return (
      <div>
        <h1>List of Games:</h1>
        <div className="containerCard">
          {this.state.games.map(game => (
            <Link to={`/games/${game._id}`} className="linked">
              <div key={game.name} className="gameCard">
                {/* <div className="image-section">
            <li>

              <img src={game.image_url} alt='#' />
            </li>
          </div> */}
                <div className="description-section">
                  <h1>{game.name}</h1>
                </div>
                <div>
                  <h2>{game.description}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
