import React, { Component, useState } from "react";
import axios from "axios";
import "./NewGame.css";
import GameService from "../../utils/GameService";
import "./NewGame.css";
import { useNavigation } from "react-router-dom";

const gameShopStatus = {
  onSale: "On Sale",
  recommended: "Recommended",
  new: "New",
  outOfStock: "Out of Stock",
};

const gameDefaultStatus = {
  id: undefined,
  name: "",
  platforms: [],
  releaseDate: "",
  genres: "",
  cover: {},
  summary: "",
  companies: [],
  screenshots: [],
  similars: [],
  price: undefined,
  shopStatus: undefined,
  stock: undefined,
};

const NewGame = () => {
  const gameService = new GameService();
  const { navigate } = useNavigation();

  const [search, setSearch] = useState("");
  const [searchResultArr, setSearchResultArr] = useState([]);
  const [game, setGame] = useState(gameDefaultStatus);

  console.log({ game });

  const handleChangeGame = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  // const handleChangeSelect = (e) => {
  //   setGame({
  //     ...game,
  //     platforms: [e.target.value],
  //   });
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/new`, {
        game,
      })
      .then(() => {
        setGame(gameDefaultStatus);
        navigate("/home");
      })
      .catch((error) => console.log(error));
  };

  const updateSearch = (e) => {
    if (e.target?.value) {
      setSearch(e.target.value);
    }
  };

  const searchFormSubmit = (event) => {
    event.preventDefault();

    gameService
      .search(search)
      .then(setSearchResultArr)
      .catch((error) => {
        console.log(error);
      });
  };

  const setSelectedGame = (id) => {
    gameService
      .game(id)
      .then(setGame)
      .catch((error) => {
        console.log(error);
      });
  };

  // render() {
  //   console.log("RENDER NEW GAME");

  //   let img;
  //   if (!!this.state.image) {
  //     img = `https://images.igdb.com/igdb/image/upload/t_cover_small_2x/${this.state.image}`;
  //   } else {
  //     img = "#";
  //   }

  return (
    <div className="form-section flex-column">
      <form onSubmit={searchFormSubmit} className="searchBar">
        <input type="search" name="search" id="search" placeholder="Search game" value={search} onChange={updateSearch} />
      </form>
      <div className="searchResults flex">
        {searchResultArr.map((game, i) => (
          <div key={i} className="linked">
            <div className="gameCardSmall" onClick={() => setSelectedGame(game.id)}>
              <div className="summary-section">
                <h1>{game.name}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      {game.id && (
        <form onSubmit={handleFormSubmit}>
          <div className="parent">
            <div className="div1 flex-column">
              <label for="name">Name:</label>
              <input
                id="inputName"
                type="text"
                label="Name"
                onChange={handleChangeGame}
                name="name"
                placeholder="Name of the Game"
                value={game.name || ""}
              />
            </div>
            <div className="div2 flex-column">
              <label for="image">Image:</label>
              <input
                id="inputImage"
                type="text"
                label="Image"
                onChange={handleChangeGame}
                name="image"
                placeholder="Image URL"
                value={game.cover?.url || ""}
              />

              <img src={game.cover?.url || ""} id={game.cover?.id} alt="Cover game" />
            </div>
            {/* <div className="div3 flex-column">
              <label>Platform:</label>
              <select onChange={handleChangeSelect}>
                <option value="Select a platforms">Select a platforms</option>
                {platforms.map((platform) => (
                  <option value={platform.platform_family?.name || ''}>{platform.platform_family?.name || ''}</option>
                ))}
              </select>
            </div>
            <div className="div4 flex-column">
              <label for="genres">Genre:</label>
              <input
                id="inputGenre"
                type="text"
                label="Genre"
                onChange={handleChangeGame}
                name="genres"
                placeholder="Genre URL"
                value={genres.join(', ')}
              />
            </div>
            <div className="div5 flex-column">
              <label for="releaseDate">Release date:</label>
              <input
                id="inputRelease"
                type="text"
                label="Release"
                onChange={handleChangeGame}
                name="releaseDate"
                placeholder="Release date"
                value={this.state.releaseDate}
              />
            </div> */}
            <div className="div6 flex-column">
              <label for="summary">Summary:</label>
              <textarea
                id="inputDescription"
                type="text"
                label="Description"
                onChange={handleChangeGame}
                name="summary"
                placeholder="Summary"
                value={game.summary}
              />
            </div>
            {/* <div className="div7 flex-column">
              <input
                id="inputCompanies"
                type="text"
                label="Companies"
                onChange={handleChangeGame}
                name="companies"
                placeholder="Companies"
                value={this.state.companies}
              />
            </div>
            <div className="div8 flex-column">
              <label for="similars">Similar games:</label>
              <input
                id="inputSimilars1"
                type="text"
                label="Similar Games"
                onChange={handleChangeGame}
                name="similars"
                placeholder="Similar Games"
                value={this.state.similars}
              />
            </div>
            <div className="div9 flex-column">
              <label for="screenshots">Screenshots:</label>
              <input
                id="inputScreenshots1"
                type="text"
                label="Screenshots"
                onChange={handleChangeGame}
                name="screenshots"
                placeholder="Screenshot"
                value={this.state.screenshots}
              />
            </div>
            <div className="div10 flex-column">
              <label>Category:</label>
              <select name="category" value={this.state.category} onChange={handleChangeGame}>
                <option value="On sale">On sale</option>
                <option value="Recommended">Recommended</option>
                <option value="New">New</option>
              </select>
            </div>
            <div className="div11 flex-column">
              <label for="stock">Stock:</label>
              <input
                id="inputStock"
                type="number"
                label="Stock"
                onChange={handleChangeGame}
                name="stock"
                placeholder="Units"
                value={this.state.stock}
              />
            </div>
            <div className="div12 flex-column">
              <label for="price">Price:</label>
              <input
                id="inputPrice"
                type="number"
                label="Price"
                onChange={handleChangeGame}
                name="price"
                placeholder="...$"
                value={this.state.price}
              />
            </div> */}
            <div className="div13 flex-column"> </div>
            <div className="div14 flex-column">
              <button type="submit" value="Submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewGame;
