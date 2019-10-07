// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.css"

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    console.log()
    this.props.logout(e);
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="nav-style flex">
          <div className="header flex">
            <img src='/testlogo.png' alt="" height="100"/>
            <h2>Welcome {this.state.loggedInUser.username}</h2>

          <ul className='flex'>
            <li>
              <a className='link' href='/' onClick={this.handleLogout}>Logout</a> 
            </li>
          </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul className='flex'>
              <li>
                <Link className='link' to="/signup">Signup</Link>
              </li>
              <li>
                <Link className='link' to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
