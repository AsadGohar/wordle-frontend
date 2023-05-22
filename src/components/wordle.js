import React, { useState } from "react";
import { BsBackspace } from "react-icons/bs";
import { AiOutlineEnter } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Wordle = () => {
  const [currentRow, setCurrentRow] = useState(1);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [loader, setLoader] = useState(false);

  let isLetterCheckedOrNull = (row, index) => inputLetters[String(row)][index]?.checked == null ||
  !inputLetters[String(row)][index]?.checked

  let isLetterIncorrectButInWord = (row,index) => inputLetters[String(row)][index]?.checked &&
  !inputLetters[String(row)][index]?.correct && inputLetters[String(row)][index]?.is_in_word

  let isLetterIncorrectAndNotInWord = (row,index) => !inputLetters[String(row)][index]?.correct &&
  !inputLetters[String(row)][index]?.is_in_word

  const cellClassName = (row, index) => {
    return isLetterCheckedOrNull(row,index)
      ? "cube line1 col-2"
      : isLetterIncorrectButInWord(row,index)
      ? "cube line1 col-2 grey"
      : isLetterIncorrectAndNotInWord(row,index)
      ? "cube line1 col-2 wrong"
      : "cube line1 col-2 correct";
  };

  const verifyWord = async (user_word, wordleId) => {
    setLoader(true);
    try {
      let word = getWord();
      console.log(word, "word");
      let res = await axios.post("http://localhost:4000/api/wordle/attempt", {
        user_word,
        wordleId,
        word,
      });
      if (res) {
        setLoader(false);

        if (res.data.user_won) {
          toast.success("user won");
        }
        if (!res.data.status && res.data.message !== "Word Not In The List") {
          console.log("here", res?.data?.responseArr);
          setInputLetter((prevState) => ({
            ...prevState,
            [currentRow]: [...res?.data?.responseArr],
          }));
          setCurrentRow((prevState) => prevState + 1);
        } else {
          toast.error(res.data.message);
        }
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const getWord = () => {
    let word = "";
    for (let index = 0; index < 5; index++) {
      console.log();
      word += inputLetters[currentRow][index].value;
    }
    return word;
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
          {
            value: e.target.value,
            checked: false,
            correct: false,
            is_in_word: false,
          },
        ],
      }));
      setCurrentLetter(e.target.value);
      setCurrentIndex(inputLetters[currentRow].length);
    }
  };

  const onClickEnter = async (e) => {
    e.preventDefault();
    if (currentRow > 6) {
      toast.error("Failed");
    } else if (checkIfComplete(inputLetters[String(currentRow)])) {
      verifyWord(
        inputLetters[String(currentRow)],
        Number(localStorage.getItem("wordle_id"))
      );
    } else {
      toast.error("Please Complete the Word");
    }
  };

  const onClickBackspace = async (e) => {
    e.preventDefault();
    // console.log(inputLetters[String(currentIndex)])

    const temp = [...inputLetters[String(currentRow)]];

    // removing the element using splice
    temp.splice(currentIndex, 1);
    console.log(temp, "dsad", inputLetters[String(currentRow)]);

    setInputLetter((prevState) => ({
      ...prevState,
      [currentRow]: [...temp],
    }));
    if (!currentIndex == 0) {
      setCurrentIndex((prevState) => prevState - 1);
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
                <div className={cellClassName(1, 0)}>
                  {inputLetters["1"][0]?.value}
                </div>
                <div className={cellClassName(1, 1)}>
                  {inputLetters["1"][1]?.value}
                </div>
                <div className={cellClassName(1, 2)}>
                  {inputLetters["1"][2]?.value}
                </div>
                <div className={cellClassName(1, 3)}>
                  {inputLetters["1"][3]?.value}
                </div>
                <div className={cellClassName(1, 4)}>
                  {inputLetters["1"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div className={cellClassName(2, 0)}>
                  {inputLetters["2"][0]?.value}
                </div>
                <div className={cellClassName(2, 1)}>
                  {inputLetters["2"][1]?.value}
                </div>
                <div className={cellClassName(2, 2)}>
                  {inputLetters["2"][2]?.value}
                </div>
                <div className={cellClassName(2, 3)}>
                  {inputLetters["2"][3]?.value}
                </div>
                <div className={cellClassName(2, 4)}>
                  {inputLetters["2"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div className={cellClassName(3, 0)}>
                  {inputLetters["3"][0]?.value}
                </div>
                <div className={cellClassName(3, 1)}>
                  {inputLetters["3"][1]?.value}
                </div>
                <div className={cellClassName(3, 2)}>
                  {inputLetters["3"][2]?.value}
                </div>
                <div className={cellClassName(3, 3)}>
                  {inputLetters["3"][3]?.value}
                </div>
                <div className={cellClassName(3, 4)}>
                  {inputLetters["3"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div className={cellClassName(4, 0)}>
                  {inputLetters["4"][0]?.value}
                </div>
                <div className={cellClassName(4, 1)}>
                  {inputLetters["4"][1]?.value}
                </div>
                <div className={cellClassName(4, 2)}>
                  {inputLetters["4"][2]?.value}
                </div>
                <div className={cellClassName(4, 3)}>
                  {inputLetters["4"][3]?.value}
                </div>
                <div className={cellClassName(4, 4)}>
                  {inputLetters["4"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div className={cellClassName(5, 0)}>
                  {inputLetters["5"][0]?.value}
                </div>
                <div className={cellClassName(5, 1)}>
                  {inputLetters["5"][1]?.value}
                </div>
                <div className={cellClassName(5, 2)}>
                  {inputLetters["5"][2]?.value}
                </div>
                <div className={cellClassName(5, 3)}>
                  {inputLetters["5"][3]?.value}
                </div>
                <div className={cellClassName(5, 4)}>
                  {inputLetters["5"][4]?.value}
                </div>
              </div>
              <div className="board-row">
                <div className={cellClassName(6, 0)}>
                  {inputLetters["6"][0]?.value}
                </div>
                <div className={cellClassName(6, 1)}>
                  {inputLetters["6"][1]?.value}
                </div>
                <div className={cellClassName(6, 2)}>
                  {inputLetters["6"][2]?.value}
                </div>
                <div className={cellClassName(6, 3)}>
                  {inputLetters["6"][3]?.value}
                </div>
                <div className={cellClassName(6, 4)}>
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
                  onClick={onClickBackspace}
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
