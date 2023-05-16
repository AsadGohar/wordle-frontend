import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Wordle from "./components/wordle";
import axios from "axios";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [loader, setLoader] = useState(false);

  const createGame = async () => {
    try {
      setLoader(true)
      let res = await axios.post("http://localhost:4000/api/wordle/create", {
        contestant: 1,
        userAddress: "sasdadasddas",
      });
      if (res) {
        localStorage.setItem("wordle_id", res.data.wordleGameId);
        setStartGame(true);
        setLoader(false)
      }
    } catch (error) {
      console.log(error)
      setLoader(false)
    }
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    createGame()
  };

  return (
    <div className="App d-flex justify-content-center align-items-center">
      {loader ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : !loader && startGame ? (
        <Wordle />
      ) : (
        <button
          type="button"
          onClick={handleStartGame}
          className="w-25 btn btn-primary"
        >
          Start Game
        </button>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
