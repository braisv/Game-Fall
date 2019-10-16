import React, { Component } from 'react';
import './Main.css'
import GameList from '../GameList/GameList';


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
  }

  updateSearch(e) {
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
          <GameList filterProducts={this.state.search}></GameList>
        </div>
      </div>);

  }
}