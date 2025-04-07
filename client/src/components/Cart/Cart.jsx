import React, { useEffect, useState } from "react";
import "./Cart.css";
import UserService from "../../utils/UserService";
import axios from "axios";
import PaypalButton from "../PaypalButton/PaypalButton";

const CLIENT = {
  sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID,
};
const ENV = "sandbox";

const Cart = () => {
  const [games, setGames] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [messageSuccess, setMessageSuccess] = useState();
  const [messageCancel, setMessageCancel] = useState();
  const userService = new UserService();

  const getGamesCart = () => {
    userService
      .selectedGames()
      .then((userPopulate) => {
        const gamesService = userPopulate.chart;

        const total = gamesService.reduce((a, b) => {
          return a + +b.price * +b.amount;
        }, 0);

        console.log("** userService call", { gamesService, total });

        setGames(gamesService);
        setFinalPrice(total);
      })
      .catch((err) => console.log("NO POPULA", err));
  };

  useEffect(() => {
    getGamesCart();
  }, []);

  const addGame = (game) => {
    const { amount, _id, price } = game;

    axios
      .post(`${process.env.REACT_APP_API_URL}/update`, { id: _id, amount: ++amount })
      .then(
        () => {
          if (price) {
            setFinalPrice(finalPrice + price);
          }
        },
        () => getGamesCart()
      )
      .catch((error) => console.log(error));
  };

  const deleteGame = (game) => {
    const { amount, _id, price } = game;

    if (game.amount === 1) {
      userService
        .removeFromCart(game)
        .then(() => {
          setFinalPrice(finalPrice - price);
          setGames(games.filter((gameArr) => gameArr !== game));
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/update`, { id: _id, amount: ++amount })
        .then(
          () => {
            setFinalPrice(finalPrice - price);
          },
          () => getGamesCart()
        )
        .catch((error) => console.log(error));
    }
  };

  const onSuccess = (payment) => {
    setMessageSuccess("Thank you for your money");
    setGames("");
    setFinalPrice(0);

    setTimeout(() => {
      setMessageSuccess(null);
    }, 6000);
    console.log(messageSuccess);
    console.log("Successful payment!", payment);
  };

  const onError = (error) => console.log("Erroneous payment OR failed to load script!", error);

  const onCancel = (data) => {
    setMessageCancel("Something went wrong!");

    setTimeout(() => {
      setMessageCancel(null);
    }, 6000);

    console.log("Cancelled payment!", data);
  };

  const button = {
    style: {
      tagline: "false",
      color: "black",
    },
  };

  const alert = messageSuccess ? <div className="alertSuccess">{messageSuccess}</div> : null;
  const alertCancel = messageCancel ? <div className="alertSuccess">{messageCancel}</div> : null;

  const cartItems = games
    ? games.map((game) => {
        return (
          <div className="chart flex">
            <img className="col-1" src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${game.image}`} alt="GAME COVER" />
            <div className="col-2">
              <h3>{game.name}</h3>
              <p>{game.platform}</p>
            </div>
            <div className="col-3">
              <div className="amountCart">
                <p>{game.amount}</p>
                <button className="addGame buttonCart" onClick={() => addGame(game)}>
                  +
                </button>
                <button className="deleteGame buttonCart" onClick={() => deleteGame(game)}>
                  -
                </button>
              </div>
            </div>
            <div className="col-4">{game.price ? game.price : 0} €</div>
            <div className="col-5">{game.amount * game.price} €</div>
          </div>
        );
      })
    : null;

  return (
    <div className="container-chart flex-column">
      {alert}
      {alertCancel}
      <div className="chart flex">
        <div className="col-1" />
        <div className="col-2">
          <h3>Game</h3>
        </div>
        <div className="col-3">Quantity</div>
        <div className="col-4">Unit Price</div>
        <div className="col-5">Total Price</div>
      </div>
      <div className="content-chart">{cartItems}</div>

      <div className="payment flex">
        <button onClick={getGamesCart}>Final Price: {finalPrice} €</button>
        <div>
          <PaypalButton
            style={button.style}
            client={CLIENT}
            env={ENV}
            commit={true}
            currency={"EUR"}
            total={finalPrice}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
