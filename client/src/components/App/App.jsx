import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import AuthService from "../auth/AuthService";
import Main from "../Main/Main";
import NewGame from "../NewGame/NewGame"

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
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  fetchUser() {
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
              </Switch>
            </header>
          </div>
        </React.Fragment>
      );
    }
  }
}
