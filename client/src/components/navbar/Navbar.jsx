// navbar/Navbar.js

import React, { Component } from "./node_modules/react";
import { Link } from "./node_modules/react-router-dom";
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
        <nav className="nav-style flex-column">
          <div className="header flex">
              <Link className='link' to="/signup"><div className="nav-box flex home">Home</div></Link>            
              <Link className='link' to="/signup"><div className="nav-box flex shop">Shop</div></Link>
              <Link className='link' to="/signup"><div className="nav-box flex market">Market</div></Link>     
              <Link className='link' to="/signup"><div className="nav-box flex aboutus">About us</div></Link>
              <Link className='link' to="/signup"><div className="nav-box flex user">{this.state.loggedInUser.username}</div></Link>
        
          <ul className='flex'>
            <li>
              <a className='link' href='/' onClick={this.handleLogout}>Logout</a> 
            </li>
          </ul>
          </div>
          <form className='searchBar'>
            <input type="search" name="search" id="search" placeholder='Search food' onChange={e => this.props.updateSearch(e)} />
          </form>
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
            <form className='searchBar'>
              <input type="search" name="search" id="search" placeholder='Search Game' onChange={e => this.props.updateSearch(e)} />
            </form>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
