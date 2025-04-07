import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./GameCard.scss";
import axios from "axios";
import UserService from "../../utils/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: this.props.userInSession,
      game: "",
      message: null,
      messageDelete: null,
      messageCart: null,
      buttonSelected: null,
    };
    this.userService = new UserService();
  }

  componentDidMount() {
    this.getGameDetails();
  }

  toggleWish() {
    if (!this.state.buttonSelected) {
      this.userService
        .removeWish(this.props.gameID)
        .then(
          (updatedUserWish) => {
            this.setState({
              ...this.state,
              loggedInUser: updatedUserWish,
              buttonSelected: false,
            });
          },
          () => {
            console.log("REMOVED GAME IN WISHLIST", this.state.loggedInUser.wishlist);
          }
        )
        .catch((error) => console.log(error));
    } else {
      this.userService.updateUserWish(this.props.gameID).then(
        (updatedUserWish) => {
          this.setState({
            ...this.state,
            loggedInUser: updatedUserWish,
            buttonSelected: true,
          });
        },
        () => {
          console.log("NEW GAME IN WISHLIST", this.state.loggedInUser.wishlist);
        }
      );
    }
  }

  updateUserChart(updatedUserObj) {
    return this.userService.updateUserChart(updatedUserObj).then().catch();
  }

  updateUserWish(updatedUserObj) {
    return this.userService.updateUserWish(updatedUserObj).then().catch();
  }

  toggleButton() {
    this.setState(
      {
        ...this.state,
        buttonSelected: !this.state.buttonSelected,
      },
      () => this.toggleWish(this.props.gameID)
    );
  }

  toggleChart() {
    let elementsInChart = this.state.loggedInUser.chart;
    if (elementsInChart.includes(this.props.gameID)) {
      this.setState({
        ...this.state,
        message: "This game is already in the Cart",
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          message: null,
        });
      }, 4000);
      return;
    } else {
      elementsInChart.push(this.props.gameID);
    }

    this.userService.updateUserChart(this.props.gameID).then(
      (updatedUser) => {
        this.setState({
          ...this.state,
          loggedInUser: updatedUser,
          messageCart: "You just added this game to the Cart",
        });
      },
      () => {
        console.log("NEW GAME IN CART", this.state.loggedInUser.chart);
      }
    );
  }

  getGameDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/game/${this.props.gameID}`)
      .then((gameFromDb) => {
        const game = gameFromDb.data;
        const gameWished = this.props.userInSession.wishlist.includes(this.props.gameID);
        let buttonSelectedChange;
        gameWished ? (buttonSelectedChange = true) : (buttonSelectedChange = false);
        this.setState({
          ...this.state,
          game: game,
          buttonSelected: buttonSelectedChange,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getGameDetails = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/game/${this.props.gameID}`)
      .then((gameFromDb) => {
        const game = gameFromDb.data;
        const gameWished = this.props.userInSession.wishlist.includes(this.props.gameID);
        let buttonSelectedChange;
        gameWished ? (buttonSelectedChange = true) : (buttonSelectedChange = false);
        this.setState({
          ...this.state,
          game: game,
          buttonSelected: buttonSelectedChange,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  alert() {
    this.setState({
      ...this.state,
      messageDelete: "Are you sure you want to remove this game?",
    });
  }

  hideMessage() {
    this.setState({
      ...this.state,
      messageDelete: null,
      messageCart: null,
    });
  }

  removeGame() {
    axios
      .post(`${process.env.REACT_APP_API_URL}/remove/${this.props.gameID}`)
      .then(() => {
        this.setState({
          ...this.state,
        });
        this.props.history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let screenshots = null;
    if (!!this.state.game.screenshots) {
      screenshots = this.state.game.screenshots.map((shot, i) => {
        return (
          <div className="size">
            {" "}
            {i + 1}
            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${shot}`} alt="Cover game" />
          </div>
        );
      });
    }

    let genres = null;
    if (!!this.state.game.genre) {
      genres = this.state.game.genre.map((genre) => {
        return <div className="desc-button">{genre}</div>;
      });
    }

    let companies = null;
    if (!!this.state.game.companies) {
      companies = this.state.game.companies.map((companie) => {
        return <div className="desc-button">{companie}</div>;
      });
    }

    let similars = null;
    if (!!this.state.game.similars) {
      similars = this.state.game.similars.map((simil) => {
        return <div className="desc-button">{simil}</div>;
      });
    }

    let alert = null;
    if (!!this.state.message) {
      alert = <div className="alert">{this.state.message}</div>;
    }

    let alertDelete = null;
    if (!!this.state.messageDelete) {
      alertDelete = (
        <div className="alertDelete flex-column">
          {this.state.messageDelete}
          <div>
            <button onClick={() => this.hideMessage()}>MAYBE NOT</button>
            <button className="redButton" onClick={() => this.removeGame()}>
              DELETE
            </button>
          </div>
        </div>
      );
    }

    let alertCart = null;
    if (!!this.state.messageCart) {
      alertCart = (
        <div className="alertCart flex-column">
          {this.state.messageCart}
          <div>
            <button onClick={() => this.hideMessage()}>Keep Buying</button>
            <Link className="link" to={`/cart`}>
              <button>Go to Cart</button>
            </Link>
          </div>
        </div>
      );
    }

    let editButtons = null;
    if (this.state.loggedInUser.role === "ADMIN") {
      editButtons = (
        <div>
          <Link className="link" to={`/edit/${this.state.game._id}`}>
            <div className="icon-edit flex">
              <FontAwesomeIcon size="xs" icon={faEdit} />
            </div>
          </Link>
          <div onClick={() => this.alert()} className="icon-delete flex">
            <FontAwesomeIcon size="xs" icon={faTrashAlt} />
          </div>
        </div>
      );
    }

    return (
      <div className="container-card">
        {editButtons}
        {alertDelete}
        <div className="images">
          <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${this.state.game.image}`} alt="Cover game" />
        </div>

        <p className="pick">{!!screenshots ? "Screenshots" : ""}</p>
        <div className="sizes">{screenshots}</div>
        <div className="product">
          <p>{this.state.game.platform}</p>
          <h1>{this.state.game.name}</h1>
          <h2 id="price">{this.state.game.price} €</h2>
          <div className="game-info">
            <p className="desc">{this.state.game.description}</p>
            <h2>Genres:</h2>
            <div className="desc-buttons">{genres}</div>
            <h2>Companies:</h2>
            <div className="desc-buttons">{companies}</div>
            <h2>Similar games:</h2>
            <div className="desc-buttons">{similars}</div>
          </div>
          <div className="buttons">
            <button onClick={() => this.toggleChart()} className="add">
              Add to Cart
            </button>
            <button onClick={() => this.toggleButton()} className={this.state.buttonSelected ? "like is-wish" : "like is-blue"}>
              <span>♥</span>
            </button>
            {alert}
            {alertCart}
          </div>
        </div>
      </div>
    );
  }
}

export default GameCard;
