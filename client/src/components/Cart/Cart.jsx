import React, { Component } from 'react'
import './Cart.css'
// import UserService from '../../utils/UserService'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.userInSession,
      games: ''
    }
    // this.userService = new UserService();
  }

  // componentDidMount() {
    // console.log('USER IN SESSION', this.props.userInSession)
    // this.userService.selectedGames(this.props.userInSession.id)
    //     .then(userPopulate => {
    //         console.log('RESPONSE FROM SERVICE ', userPopulate)
    //         const games = userPopulate.purchases
    //         console.log('GAMES ', games)
            // let total = games.reduce((a, b) => {
            //     return a + b.price
            // }, 0)

            // this.setState({
            //     ...this.state,
            //     games: games,
            //     toPay: total
            // })
//         })
// }

  render() {
    return (
      <div className='container-chart flex-column'>
        <div className="chart flex">
          <img src="#" alt="GAME COVER" />
          <div>
            <h3>Game Title</h3>
            <p>Platform</p>
          </div>
          <div>Quantity</div>
          <div>Unit Price</div>
          <div>Total Price</div>
        </div>

      </div>
    )
  }
}
