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

  updateSearch(e) {
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
      <div className='gameList'>
        <div class="container flex">
          {this.state.games.map(game => (
            <Link to={`/game/${game._id}`} className="linked">
              <div class="card">
                <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image[0]}`} alt="Cover game" />
              </div>
              <div className="text-img"><h3>{game.name}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}
