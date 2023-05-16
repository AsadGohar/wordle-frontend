import React, { useState } from "react";
import { BsBackspace } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Wordle = () => {
  const [currentRow, setCurrentRow] = useState(1);
  const [loader, setLoader] = useState(false);

  const verifyWord = async (user_word, wordleId) => {
    setLoader(true);
    try {
      let res = await axios.post("http://localhost:4000/api/wordle/attempt", {
        user_word,
        wordleId,
      });
      if (res) {
        setLoader(false);

        if (res.data.user_won) {
          toast.success("user won");
        }
        setInputLetter((prevState) => ({
          ...prevState,
          [currentRow]: [...res?.data?.responseArr],
        }));
        setCurrentRow((prevState) => prevState + 1);
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const [inputLetters, setInputLetter] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  });

  const onClickAlphabet = (e) => {
    e.preventDefault();
    if (inputLetters[String(currentRow)].length == 5) {
      toast.error("Press Enter to Continue");
    } else {
      setInputLetter((prevState) => ({
        ...prevState,
        [currentRow]: [
          ...prevState[currentRow],
          { value: e.target.value, checked: "n", correct: "f" },
        ],
      }));
    }
  };

  const checkWord = () => {
    let wordArr = "SWIPE".split("");
    let correct = false;
    let resArr = [];
    for (
      let index = 0;
      index < inputLetters[String(currentRow)].length;
      index++
    ) {
      const element = inputLetters[String(currentRow)][index].value;
      console.log(element !== wordArr[index], element, wordArr[index]);
      if (element !== wordArr[index]) {
        resArr.push(
          createResultObj(
            inputLetters[String(currentRow)][index].value,
            "y",
            "f"
          )
        );
        correct = false;
      } else if (index == 5 && element == wordArr[index] && correct) {
        resArr.push(
          createResultObj(
            inputLetters[String(currentRow)][index].value,
            "y",
            "t"
          )
        );
        setInputLetter((prevState) => ({
          ...prevState,
          [currentRow]: [...resArr],
        }));
        toast.success("word is correct");
        return;
      } else {
        resArr.push(
          createResultObj(
            inputLetters[String(currentRow)][index].value,
            "y",
            "t"
          )
        );
        correct = true;
      }
    }
    console.log(resArr, "RESULT");
    setInputLetter((prevState) => ({
      ...prevState,
      [currentRow]: [...resArr],
    }));
    setCurrentRow((prevState) => prevState + 1);
  };

  const createResultObj = (value, checked, correct) => {
    return {
      value,
      checked,
      correct,
    };
  };

  const onClickEnter = async (e) => {
    e.preventDefault();
    if (currentRow > 6) {
      toast.error("Failed");
    } else if (checkIfComplete(inputLetters[String(currentRow)])) {
      verifyWord(inputLetters[String(currentRow)], Number(localStorage.getItem('wordle_id')));
    } else {
      toast.error("Please Complete the Word");
    }
  };

  const checkIfComplete = (arr) => {
    return arr.every((element) => element.value !== "") && arr.length == 5;
  };

  return (
    <div className="game-body">
      {loader ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          <div className="Board-module">
            <div className="Board-module-board">
              <div className="board-row">
                <div
                  className={
                    inputLetters["1"][0]?.checked == null ||
                    inputLetters["1"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["1"][0]?.checked === "y" &&
                        inputLetters["1"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["1"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["1"][1]?.checked == null ||
                    inputLetters["1"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["1"][1]?.checked === "y" &&
                        inputLetters["1"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["1"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["1"][2]?.checked == null ||
                    inputLetters["1"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["1"][2]?.checked === "y" &&
                        inputLetters["1"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["1"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["1"][3]?.checked == null ||
                    inputLetters["1"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["1"][3]?.checked === "y" &&
                        inputLetters["1"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["1"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["1"][4]?.checked == null ||
                    inputLetters["1"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["1"][4]?.checked === "y" &&
                        inputLetters["1"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["1"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div
                  className={
                    inputLetters["2"][0]?.checked == null ||
                    inputLetters["2"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["2"][0]?.checked === "y" &&
                        inputLetters["2"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["2"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["2"][1]?.checked == null ||
                    inputLetters["2"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["2"][1]?.checked === "y" &&
                        inputLetters["2"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["2"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["2"][2]?.checked == null ||
                    inputLetters["2"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["2"][2]?.checked === "y" &&
                        inputLetters["2"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["2"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["2"][3]?.checked == null ||
                    inputLetters["2"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["2"][3]?.checked === "y" &&
                        inputLetters["2"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["2"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["2"][4]?.checked == null ||
                    inputLetters["2"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["2"][4]?.checked === "y" &&
                        inputLetters["2"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["2"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div
                  className={
                    inputLetters["3"][0]?.checked == null ||
                    inputLetters["3"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["3"][0]?.checked === "y" &&
                        inputLetters["3"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["3"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["3"][1]?.checked == null ||
                    inputLetters["3"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["3"][1]?.checked === "y" &&
                        inputLetters["3"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["3"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["3"][2]?.checked == null ||
                    inputLetters["3"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["3"][2]?.checked === "y" &&
                        inputLetters["3"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["3"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["3"][3]?.checked == null ||
                    inputLetters["3"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["3"][3]?.checked === "y" &&
                        inputLetters["3"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["3"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["3"][4]?.checked == null ||
                    inputLetters["3"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["3"][4]?.checked === "y" &&
                        inputLetters["3"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["3"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div
                  className={
                    inputLetters["4"][0]?.checked == null ||
                    inputLetters["4"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["4"][0]?.checked === "y" &&
                        inputLetters["4"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["4"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["4"][1]?.checked == null ||
                    inputLetters["4"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["4"][1]?.checked === "y" &&
                        inputLetters["4"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["4"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["4"][2]?.checked == null ||
                    inputLetters["4"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["4"][2]?.checked === "y" &&
                        inputLetters["4"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["4"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["4"][3]?.checked == null ||
                    inputLetters["4"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["4"][3]?.checked === "y" &&
                        inputLetters["4"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["4"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["4"][4]?.checked == null ||
                    inputLetters["4"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["4"][4]?.checked === "y" &&
                        inputLetters["4"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["4"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div
                  className={
                    inputLetters["5"][0]?.checked == null ||
                    inputLetters["5"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["5"][0]?.checked === "y" &&
                        inputLetters["5"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["5"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["5"][1]?.checked == null ||
                    inputLetters["5"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["5"][1]?.checked === "y" &&
                        inputLetters["5"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["5"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["5"][2]?.checked == null ||
                    inputLetters["5"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["5"][2]?.checked === "y" &&
                        inputLetters["5"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["5"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["5"][3]?.checked == null ||
                    inputLetters["5"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["5"][3]?.checked === "y" &&
                        inputLetters["5"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["5"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["5"][4]?.checked == null ||
                    inputLetters["5"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["5"][4]?.checked === "y" &&
                        inputLetters["5"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["5"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div
                  className={
                    inputLetters["6"][0]?.checked == null ||
                    inputLetters["6"][0]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["6"][0]?.checked === "y" &&
                        inputLetters["6"][0]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["6"][0]?.value}
                </div>
                <div
                  className={
                    inputLetters["6"][1]?.checked == null ||
                    inputLetters["6"][1]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["6"][1]?.checked === "y" &&
                        inputLetters["6"][1]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["6"][1]?.value}
                </div>
                <div
                  className={
                    inputLetters["6"][2]?.checked == null ||
                    inputLetters["6"][2]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["6"][2]?.checked === "y" &&
                        inputLetters["6"][2]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["6"][2]?.value}
                </div>
                <div
                  className={
                    inputLetters["6"][3]?.checked == null ||
                    inputLetters["6"][3]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["6"][3]?.checked === "y" &&
                        inputLetters["6"][3]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["6"][3]?.value}
                </div>
                <div
                  className={
                    inputLetters["6"][4]?.checked == null ||
                    inputLetters["6"][4]?.checked == "n"
                      ? "cube line1 col-2"
                      : inputLetters["6"][4]?.checked === "y" &&
                        inputLetters["6"][4]?.correct == "f"
                      ? "cube line1 col-2 wrong"
                      : "cube line1 col-2 correct"
                  }
                >
                  {inputLetters["6"][4]?.value}
                </div>
              </div>
            </div>
          </div>
          <div className="Keyboard-module">
            <div id="keyboard-cont">
              <div className="first-row">
                <button
                  className="keyboard-button"
                  value="Q"
                  id="Q"
                  onClick={onClickAlphabet}
                >
                  q
                </button>
                <button
                  className="keyboard-button"
                  value="W"
                  id="W"
                  onClick={onClickAlphabet}
                >
                  w
                </button>
                <button
                  className="keyboard-button"
                  value="E"
                  id="E"
                  onClick={onClickAlphabet}
                >
                  e
                </button>
                <button
                  className="keyboard-button"
                  value="R"
                  id="R"
                  onClick={onClickAlphabet}
                >
                  r
                </button>
                <button
                  className="keyboard-button"
                  value="T"
                  id="T"
                  onClick={onClickAlphabet}
                >
                  t
                </button>
                <button
                  className="keyboard-button"
                  value="Y"
                  id="Y"
                  onClick={onClickAlphabet}
                >
                  y
                </button>
                <button
                  className="keyboard-button"
                  value="U"
                  id="U"
                  onClick={onClickAlphabet}
                >
                  u
                </button>
                <button
                  className="keyboard-button"
                  value="I"
                  id="I"
                  onClick={onClickAlphabet}
                >
                  i
                </button>
                <button
                  className="keyboard-button"
                  value="O"
                  id="O"
                  onClick={onClickAlphabet}
                >
                  o
                </button>
                <button
                  className="keyboard-button"
                  value="P"
                  id="P"
                  onClick={onClickAlphabet}
                >
                  p
                </button>
              </div>
              <div className="second-row">
                <div className="flex-div"></div>
                <button
                  className="keyboard-button"
                  value="A"
                  id="A"
                  onClick={onClickAlphabet}
                >
                  a
                </button>
                <button
                  className="keyboard-button"
                  value="S"
                  id="S"
                  onClick={onClickAlphabet}
                >
                  s
                </button>
                <button
                  className="keyboard-button"
                  value="D"
                  id="D"
                  onClick={onClickAlphabet}
                >
                  d
                </button>
                <button
                  className="keyboard-button"
                  value="F"
                  id="F"
                  onClick={onClickAlphabet}
                >
                  f
                </button>
                <button
                  className="keyboard-button"
                  value="G"
                  id="G"
                  onClick={onClickAlphabet}
                >
                  g
                </button>
                <button
                  className="keyboard-button"
                  value="H"
                  id="H"
                  onClick={onClickAlphabet}
                >
                  h
                </button>
                <button
                  className="keyboard-button"
                  value="J"
                  id="J"
                  onClick={onClickAlphabet}
                >
                  j
                </button>
                <button
                  className="keyboard-button"
                  value="K"
                  id="K"
                  onClick={onClickAlphabet}
                >
                  k
                </button>
                <button
                  className="keyboard-button"
                  value="L"
                  id="L"
                  onClick={onClickAlphabet}
                >
                  l
                </button>
                <div className="flex-div"></div>
              </div>
              <div className="third-row">
                <button
                  className="keyboard-button"
                  value="Enter"
                  onClick={onClickEnter}
                >
                  <AiOutlineEnter />
                </button>
                <button
                  className="keyboard-button"
                  value="Z"
                  id="Z"
                  onClick={onClickAlphabet}
                >
                  z
                </button>
                <button
                  className="keyboard-button"
                  value="X"
                  id="X"
                  onClick={onClickAlphabet}
                >
                  x
                </button>
                <button
                  className="keyboard-button"
                  value="C"
                  id="C"
                  onClick={onClickAlphabet}
                >
                  c
                </button>
                <button
                  className="keyboard-button"
                  value="V"
                  id="V"
                  onClick={onClickAlphabet}
                >
                  v
                </button>
                <button
                  className="keyboard-button"
                  value="B"
                  id="B"
                  onClick={onClickAlphabet}
                >
                  b
                </button>
                <button
                  className="keyboard-button"
                  value="N"
                  id="N"
                  onClick={onClickAlphabet}
                >
                  n
                </button>
                <button
                  className="keyboard-button"
                  value="M"
                  id="M"
                  onClick={onClickAlphabet}
                >
                  m
                </button>
                <button
                  className="keyboard-button"
                  value="Del"
                  //onClick={myfn.delclicked}
                >
                  <BsBackspace />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wordle;
