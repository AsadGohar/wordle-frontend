import React, { useRef, useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Wordle from "./components/wordle";

function App() {
  const [startGame, setStartGame] = useState(false);

  const handleStartGame =(e) => {
    e.preventDefault()
    setStartGame(true)
  }
   
  return (
    <div className="App d-flex justify-content-center align-items-center">
      {
        startGame ?
        <Wordle /> :
        <button type="button" onClick={handleStartGame} className="w-25 btn btn-primary">Start Game</button>
      }
      <ToastContainer />
    </div>
  );
}

export default App;
