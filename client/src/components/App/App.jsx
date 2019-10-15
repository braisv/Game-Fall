import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import AuthService from "../auth/AuthService";
import Main from "../Main/Main";
import NewGame from "../NewGame/NewGame"
import GameCard from "../GameCard/GameCard";
import Cart from "../Cart/Cart";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
    this.fetchUser()
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  logout = () => {
    this.service.logout()
    .then(() => {
      debugger
      // this.setState({ loggedInUser: null });
    })
    .catch(err=>console.log(err));
  };

  fetchUser() {
    debugger
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response,
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false,
        });
      });
  }

  // componentDidMount(){
  //   this.getGame()
  // }

  // async getGame() {
  //   let games = await this.serviceAxios.getGame();
  //   console.log(games)
  // }


  render() {
    // debugger;
    // throw new Error("test")
    console.log("hola 2")
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Redirect to="/home" />

          <div className="App flex">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            </header>
          </div>
          <Switch>
          <Route exact path="/home" component={Main} />
          <Route exact path="/addgame" component={NewGame} />
          <Route exact path="/game/:id" render={(props) => {
            return <GameCard userInSession={this.state.loggedInUser} gameID={props.match.params.id} />}
          } />
          <Route exact path="/cart" render={(props) => {
            return <Cart userInSession={this.state.loggedInUser} gameID={props.match.params.id} />}
          } />
        </Switch>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Redirect to="/login" />

          <div className="App flex">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
              <Switch>
                <Route exact path="/signup" render={() => <Signup getUser={this.getUser} />} />
                <Route exact path="/login" render={() => <Login getUser={this.getUser} />} />
                {/* <Route exact path="/test" component={Appoteosis} /> */}
              </Switch>
            </header>
          </div>
        </React.Fragment>
      );
    }
  }
}
