import React, { Component } from 'react'
import './Cart.css'
import UserService from '../../utils/UserService'
import axios from 'axios'
import PaypalButton from '../PaypalButton/PaypalButton';
import { withRouter } from "react-router-dom";


const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,

};
const ENV = 'sandbox';


class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.userInSession,
      games: '',
      finalPrice: '',
      messageSuccess: null,
      messageCancel: null,
    }
    this.userService = new UserService();
  }

  componentDidMount() {
    this.getGamesCart();
  }

  getGamesCart = () => {

    this.userService.selectedGames()
      .then(userPopulate => {
        const games = userPopulate.chart

        let total = games.reduce((a, b) => {
          return a + (+b.price * +b.amount)
        }, 0)

        this.setState({
          ...this.state,
          games: games,
          finalPrice: total
        })
      })
      .catch(err => console.log('NO POPULA', err))
  }

  addGame = (game) => {
    let amount = ++game.amount
    let id = game._id

    axios.post(`${process.env.REACT_APP_API_URL}/update`, { id, amount })
      .then(() => {
        this.setState({
          ...this.state,
          finalPrice: this.state.finalPrice + game.price
        })
      }, () => this.getGamesCart())
      .catch(error => console.log(error))
  }

  deleteGame = (game) => {

    if (game.amount === 1) {
      this.userService.removeFromCart(game)
        .then(() => {
          this.setState({
            ...this.state,
            finalPrice: this.state.finalPrice - game.price,
            games: this.state.games.filter(gameArr => gameArr !== game)
          })
        })
        .catch(error => console.log(error))
    } else {
      let amount = --game.amount
      let id = game._id

      axios.post(`${process.env.REACT_APP_API_URL}/update`, { id, amount })
        .then(() => {
          this.setState({
            ...this.state,
            finalPrice: this.state.finalPrice - game.price
          })
        }, () => this.getGamesCart())
        .catch(error => console.log(error))

    }
  }

  render() {

    const onSuccess = (payment) => {
      this.setState({
        ...this.state,
        messageSuccess: "Thank you for your money!",
        games: "",
        finalPrice: 0
      })
      
      setTimeout(() => {
        this.setState({
          ...this.state,
          messageSuccess: null
        })
      }, 6000)
      console.log(this.state.messageSuccess)
      console.log('Successful payment!', payment);
    }
  


    const onError = (error) =>
      console.log('Erroneous payment OR failed to load script!', error);
    const onCancel = (data) => {
      this.setState({
        ...this.state,
        messageCancel: "Something went wrong!",
      })
      
      setTimeout(() => {
        this.setState({
          ...this.state,
          messageCancel: null
        })
      }, 6000)

      console.log('Cancelled payment!', data);
    }

    let button = {
      style: {
        tagline: 'false',
        color: 'black'
      }
    }

    let alert = null
    if (!!this.state.messageSuccess) {
      alert = (<div className="alertSuccess">{this.state.messageSuccess}</div>)
    }

    let alertCancel = null
    if (!!this.state.messageCancel) {
      alertCancel = (<div className="alertSuccess">{this.state.messageCancel}</div>)
    }


    let cartItems = null

    if (!!this.state.games) {
      cartItems = this.state.games.map(game => {
        return (
          <div className="chart flex">
            <img className="col-1" src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.image}`} alt="GAME COVER" />
            <div className="col-2">
              <h3>{game.name}</h3>
              <p>{game.platform}</p>
            </div>
            <div className="col-3">
              <div className="amountCart">
                <p>{game.amount}</p>
                <button className="addGame buttonCart" onClick={() => this.addGame(game)}>+</button>
                <button className="deleteGame buttonCart" onClick={() => this.deleteGame(game)}>-</button>
              </div>
            </div>
            <div className="col-4">{(game.price) ? game.price : 0} €</div>
            <div className="col-5">{game.amount * game.price} €</div>
          </div>
        )
      })
    }

    return (
      <div className='container-chart flex-column'>
        {alert}{alertCancel}
        <div className="chart flex">
          <div className="col-1" />
          <div className="col-2">
            <h3>Game</h3>
          </div>
          <div className="col-3">Quantity</div>
          <div className="col-4">Unit Price</div>
          <div className="col-5">Total Price</div>
        </div>
        <div className="content-chart">{cartItems}</div>

        <div className="payment flex">
          <button onClick={() => this.getGamesCart()}>Final Price: {this.state.finalPrice} €</button>
          <div>
            <PaypalButton
              style={button.style}
              client={CLIENT}
              env={ENV}
              commit={true}
              currency={'EUR'}
              total={this.state.finalPrice}
              onSuccess={onSuccess}
              onError={onError}
              onCancel={onCancel}
            />
          </div>
        </div>

      </div>
    )
  }
}


export default withRouter(Cart);
