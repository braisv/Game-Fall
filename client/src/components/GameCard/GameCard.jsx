import React, { Component } from 'react'
import './GameCard.scss'
import axios from 'axios'
import UserService from '../../utils/UserService'


export default class GameCard extends Component {
  constructor(props) {
    super(props)

    let gameWished = this.props.userInSession.wishlist.includes(this.props.gameID)
    let buttonSelected, buttonClass;

    if (gameWished) {
      buttonSelected = true;
      buttonClass = "like is-wish"
      
    } else {
      buttonSelected = false;
      buttonClass = "like is-blue"
    }

    this.state = {
      loggedInUser: this.props.userInSession,
      game: '',
      buttonSelected: buttonSelected,
      buttonClass: buttonClass
    }
    this.userService = new UserService();
  }

  componentDidMount() {
    this.getGameDetails();
  }

  toggleWish = id => {
    let wishes = this.state.loggedInUser.wishlist;
    
    if (wishes.includes(id)) {
      wishes.splice(wishes.indexOf(id),1)
    } else {
      wishes.push(id)
    }
    
    let updatedUser = {
      ...this.state.loggedInUser,
      wishlist: wishes
    }

    this.setState({
      ...this.state,
      loggedInUser: updatedUser
    })
    this.userService.updateUser(updatedUser)
  }

  updateUser(updatedUserObj) {
    return this.userService.updateUser(updatedUserObj).then().catch();
  }

  toggleButton() {
    if(!this.state.buttonSelected) {
      this.setState({
        buttonSelected: true,
        buttonClass: "like is-wish"
      })
    } else {
      this.setState({
        buttonSelected: false,
        buttonClass: "like"
      })
    }

    this.toggleWish(this.props.gameID)
  }

  getGameDetails = () => {
    axios
      .get(`http://localhost:5000/game/${this.props.gameID}`)
      .then(gameFromDb => {
        const game = gameFromDb.data;
        console.log(game);
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
          <h2 id="price">{this.state.game.price} €</h2>
          <div className="game-info">
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
            <button onClick={() => this.toggleButton()} style={this.state.styles} className={this.state.buttonClass}><span>♥</span></button>
          </div>
        </div>
      </div>

    )
  }
}
