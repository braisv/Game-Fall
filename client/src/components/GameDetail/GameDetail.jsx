import React, { Component } from 'react'
import './GameCard.scss'
import axios from 'axios'



export default class GameCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedUser: this.props.userInSession,
      game: ''
    }
  }

  toggleWish = id => {
    let wishes = this.state.loggedUser.wishlist;
    
    if (wishes.includes(id)) {
      wishes.splice(wishes.indexOf(id),1)
    } else {
      wishes.push(id)
    }

    let updatedUser = {
      ...this.state.loggedUser,
      wishlist: wishes
    }

    this.setState({
      ...this.state,
      loggedUser: updatedUser
    })

    this.updateUser(updatedUser)
  }

  updateUser(updatedUserObj) {
    // return this.UserService.updateUser(updatedUserObj).then().catch();
  }


  componentDidMount() {
    this.getGameDetails();
  }

  getGameDetails = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API_URL}/game/${params.id}`)
      .then(gameFromDb => {
        const game = gameFromDb.data;
        this.setState({ game });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {

    let screenshots = null
    if (!!this.state.game.screenshots) {
      screenshots = this.state.game.screenshots.map((shot, i) => {
        return (<div className="size"> {i + 1}
          <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${shot}`} alt="Cover game" />
        </div>)
      })
    }



    return (
      <div className="container-card" >
        <div className="images">
          <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${this.state.game.image}`} alt="Cover game" />
        </div>

        <p className="pick">{(!!screenshots) ? 'Screenshots' : '' }</p>
        <div className="sizes">
          {screenshots}
          {/* {this.state.game.screenshots.map((shot, i) => (
                  <div className="size">{i + 1}
                  <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${shot}`} alt="Cover game" />
                  </div>
                ))} */}
        </div>
        <div className="product">
          <p>{this.state.game.platform}</p>
          <h1>{this.state.game.name}</h1>
          <div className="game-info">
            <h2>{this.state.game.price}</h2>
            <p className="desc">{this.state.game.description}</p>
            <h2>Genres:</h2>
            {/* {this.state.game.genre.map(gen => (
            <p className="desc">{gen}</p>
          ))} */}
            <p className="desc">{this.state.game.genre}</p>
            <h2>Companies:</h2>
            <p className="desc">{this.state.game.companies}</p>
            <h2>Similar games:</h2>
            <p className="desc">{this.state.game.similars}</p>
          </div>
          <div className="buttons">
            <button className="add">Add to Cart</button>
            <button onClick={this.toggleWish(this.state.game._id)} className="like"><span>♥</span></button>
          </div>
        </div>
      </div>

    )
  }
}
