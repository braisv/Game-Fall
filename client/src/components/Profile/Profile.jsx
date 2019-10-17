import React, { Component } from 'react'
import './Profile.css'
import UserService from '../../utils/UserService'
import { Link } from "react-router-dom";

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.userInSession,
      gamesInCart: '',
      wishes: ''
    }
    this.userService = new UserService();
  }

  componentDidMount() {
    this.getGamesCart();
    this.getWishes();
  }

  getWishes = () => {

    this.userService.selectedWish()
      .then(userPopulate => {
        const wishList = userPopulate.wishlist

        this.setState({
          ...this.state,
          wishes: wishList
        })
      })
      .catch(err => console.log(err))
  }

  getGamesCart = () => {

    this.userService.selectedGames()
      .then(userPopulate => {
        const games = userPopulate.chart

        this.setState({
          ...this.state,
          gamesInCart: games
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    let user = this.props.userInSession;
    let cartItems = null
    let wishItems = null

    if (!!this.state.gamesInCart) {
      cartItems = this.state.gamesInCart.map(game => {
        return (
          <Link to={`/game/${game._id}`} className="linked">
            <div className="profile-img">
              <img className="profile-cart" src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.image}`} alt="GAME COVER" />
            </div>
          </Link>
        )
      })
    }

    if (!!this.state.wishes) {
      wishItems = this.state.wishes.map(game => {
        return (
          <Link to={`/game/${game._id}`} className="linked">
          <div className="profile-img">
            <img className="profile-cart" src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.image}`} alt="GAME COVER" />
          </div>
           </Link>
        )
      })
    }

    return (
      <div>
        <div className="profile-container">
          <div class="parent-profile">
            <div class="div1"><span className="label-grid">Username:</span>{user.username}</div>
            <div class="div2"><span className="label-grid">Name:</span>{user.name}</div>
            <div class="div3"><span className="label-grid">Surname:</span>{user.surname}</div>
            <div class="div4"><span className="label-grid">Email:</span>{user.email}</div>
            <div class="div5"><span className="label-grid">Phone:</span>{user.phone}</div>
            <div class="div6"><span className="label-grid">Address:</span></div>
            <div class="div7"><span className="label-grid">Name of address:</span>Casa</div>
            <div class="div8"><span className="label-grid">Street:</span>Calle de la Piruleta</div>
            <div class="div9"><span className="label-grid">Building Number:</span>113</div>
            <div class="div10"><span className="label-grid">Floor:</span>1-I</div>
            <div class="div11"><span className="label-grid">Zip Code:</span>28012</div>
            <div class="div12"><span className="label-grid">Country:</span>Spain</div>
            <div class="div13"><span className="label-grid">City:</span>Madrid</div>
            <div class="div14"><span className="label-grid">Wish List</span><div className="flex-profile">{wishItems}</div></div>
            <div class="div15"><span className="label-grid">Games in Chart</span><div className="flex-profile">{cartItems}</div></div>
          </div>
        </div>
      </div>
    )
  }
}
