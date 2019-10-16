import React, { Component } from 'react'
import './Cart.css'
import UserService from '../../utils/UserService'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.userInSession,
      games: '',
      finalPrice: ''
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
            return a + +b.price
        }, 0)

        this.setState({
            ...this.state,
            games: games,
            finalPrice: total
        })
      })
      .catch(err => console.log('NO POPULA', err))
  }

  render() {

    let cartItems = null

    if (!!this.state.games) {
      cartItems = this.state.games.map(game => {
        let amount = console.log(document.querySelector('#amount'))
        let totalPrice = game.price;
        return (
          <div className="chart flex">
            <img className="col-1" src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.image}`} alt="GAME COVER" />
            <div className="col-2">
              <h3>{game.name}</h3>
              <p>{game.platform}</p>
            </div>
            <div className="col-3"><input type="number" id="amount" min="0" defaultValue="1" onChange={amount} /></div>
            <div className="col-4">{(game.price) ? game.price : 0} €</div>
            <div className="col-5">{totalPrice} €</div>
          </div>
      )
        })
    }

    return (
      <div className='container-chart flex-column'>
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
        <button onClick={() => this.getGamesCart()}>Final Price: {this.state.finalPrice} €</button>

      </div>
    )
  }
}
