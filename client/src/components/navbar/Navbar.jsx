// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService";
import "./Navbar.css"

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: null,
    };

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
        <nav className="nav-style flex-column">
          <div className="header flex">
              <Link className='link' to="/home"><div className="nav-box flex home">Home</div></Link>            
              <Link className='link' to="/signup"><div className="nav-box flex shop">Shop</div></Link>
              <Link className='link' to="/cart"><div className="nav-box flex market">Cart</div></Link>     
              <Link className='link' to="/test"><div className="nav-box flex aboutus">About us</div></Link>
              <Link className='link' to="/signup"><div className="nav-box flex user">{this.state.loggedInUser.username}</div></Link>
        
          <ul className='flex'>
            <li>
              <a className='link' href='/' onClick={this.handleLogout}>Logout</a> 
            </li>
          </ul>
          </div>
        </nav>
      )
    } else {
      return (
        <div>
          <nav className="nav-style">
            <ul className='flex'>
              <li>
                <Link className='link' to="/signup"><div className="nav-box flex signup">Sign Up</div></Link>
              </li>
              <li>
                <Link className='link' to="/login"><div className="nav-box flex login">Log in</div></Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}
