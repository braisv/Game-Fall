import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GameList.css";

export default class GameList extends Component {
  constructor() {
    super();
    this.state = {
      games: "",
      search: "",
    };
  }

  updateSearch(e) {
    let search = e.target.value;

    this.setState({
      ...this.state,
      search: search,
    });
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT");
    console.log("API CALL: ", `${process.env.REACT_APP_API_URL}/games`);
    axios
      .get(`${process.env.REACT_APP_API_URL}/games`)
      .then(({ data }) => {
        this.setState({ games: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { games } = this.state;

    console.log({ games });

    if (!games)
      return (
        <div className="spinner">
          <div class="lds-hourglass"></div>
        </div>
      );
    return (
      <div className="gameList">
        <h1>NEW ON STORE</h1>
        <div class="container flex">
          {this.state.games
            .filter((el) => el.category == "New")
            .map((game) => (
              <Link to={`/game/${game._id}`} className="linked">
                <div class="card">
                  <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image[0]}`} alt="Cover game" />
                </div>
                <div className="text-img">
                  <h3>{game.name}</h3>
                </div>
              </Link>
            ))}
        </div>
        <h1>RECOMMENDED</h1>
        <div class="container flex">
          {this.state.games
            .filter((el) => el.category == "Recommended")
            .map((game) => (
              <Link to={`/game/${game._id}`} className="linked">
                <div class="card">
                  <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image[0]}`} alt="Cover game" />
                </div>
                <div className="text-img">
                  <h3>{game.name}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}
