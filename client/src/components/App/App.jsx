import React, { Component, useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, BrowserRouter, Router } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import AuthService from "../auth/AuthService";
import Main from "../Main/Main";
import NewGame from "../NewGame/NewGame";
import GameCard from "../GameCard/GameCard";
import Cart from "../Cart/Cart";
import Shop from "../Shop/Shop";
import Profile from "../Profile/Profile";
import EditGame from "../EditGame/EditGame";
import AboutUs from "../AboutUs/AboutUs";

const service = new AuthService();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // console.log("APP COMPONENT");

  useEffect(() => {
    const fetchUser = () => {
      return service
        .loggedin()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    };

    fetchUser();
  }, []);

  const getUser = (userObj) => {
    setLoggedInUser(userObj);
  };

  const logout = () => {
    service
      .logout()
      .then(() => {
        setLoggedInUser(null);
      })
      .catch((err) => console.log(err));
  };

  if (loggedInUser) {
    return (
      <React.Fragment>
        <Router>
          <Navigate to="/home" />

          <div className="App flex">
            <header className="App-header">
              <Navbar userInSession={loggedInUser} logout={logout} />
            </header>
          </div>
          <Routes>
            <Route exact path="/home" element={Main} />
            <Route
              exact
              path="/edit/:id"
              render={(props) => {
                return <EditGame userInSession={loggedInUser} gameID={props.match.params.id} />;
              }}
            />
            <Route exact path="/shop" render={() => <Shop userInSession={loggedInUser} />} />
            <Route exact path={`/${loggedInUser.username}`} render={() => <Profile userInSession={loggedInUser} />} />
            <Route exact path="/addgame" element={NewGame} />
            <Route exact path="/aboutus" element={AboutUs} />
            <Route
              exact
              path="/game/:id"
              render={(props) => {
                return <GameCard userInSession={loggedInUser} gameID={props.match.params.id} />;
              }}
            />
            <Route
              exact
              path="/cart"
              render={(props) => {
                return <Cart userInSession={loggedInUser} gameID={props.match.params.id} />;
              }}
            />
          </Routes>
        </Router>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Router>
          <Navigate to="/login" />

          <div className="App flex">
            <header className="App-header">
              <Navbar userInSession={loggedInUser} logout={logout} />
              <Routes>
                <Route exact path="/signup" render={() => <Signup getUser={getUser} />} />
                <Route exact path="/login" render={() => <Login getUser={getUser} />} />
                {/* <Route exact path="/test" element={Appoteosis} /> */}
              </Routes>
            </header>
          </div>
        </Router>
      </React.Fragment>
    );
  }
};

export default App;
