import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Wordle from "./components/wordle";

function App() {
  return (
    <div>
      <Wordle />
      <ToastContainer />
    </div>
  );
}

export default App;
