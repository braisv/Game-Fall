import React, { Component } from 'react';
import './Main.css'
import GameList from '../GameList/GameList';
import { Link } from "react-router-dom";


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  updateSearch(e){
    let search = e.target.value
    
    this.setState({
      ...this.state,
      search: search
    }) 
  }

  render() {
    return (
      <div className='main flex'>
        <div className="flex-colum">
          <form className='searchBar'>
            <input type="search" name="search" id="search" placeholder='Search game' onChange={e => this.updateSearch(e)} />
          </form>
          <h1>Games Fall</h1>
          <h3>Your place of games</h3>
          <p><Link className='link' to="/addgame"><div className="flex">Add new Game</div></Link></p>
          <GameList filterProducts={this.state.search}></GameList>
        </div>
      </div>);

  }
}