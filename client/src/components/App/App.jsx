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
import Shop from "../Shop/Shop";
import Profile from "../Profile/Profile";
import EditGame from "../EditGame/EditGame";
import AboutUs from "../AboutUs/AboutUs";

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
      this.setState({ loggedInUser: null });
    })
    .catch(err=>console.log(err));
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
          <Route exact path="/edit/:id" render={(props) => {
            return <EditGame userInSession={this.state.loggedInUser} gameID={props.match.params.id} />}
          } />
          <Route exact path="/shop" render={() => <Shop userInSession={this.state.loggedInUser} />}  />
          <Route exact path={`/${this.state.loggedInUser.username}`} render={() => <Profile userInSession={this.state.loggedInUser} />}  />
          <Route exact path="/addgame" component={NewGame} />
          <Route exact path="/aboutus" component={AboutUs} />
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
