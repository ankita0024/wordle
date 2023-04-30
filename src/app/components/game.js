"use client";

import Board from "./board";
import Keyboard from "./keyboard";
import { useEffect, useState } from "react";
import Modal from "./modal";
import Settings from "./settings";
import Alert from "./alert";
import { useSelector, useDispatch } from "react-redux";
import { fetchWords } from "../store/action";

const Colors = {
  GREY: "bg-gray-600",
  GREEN: "bg-lime-500",
  YELLOW: "bg-yellow-400",
};

export default function Game() {
  const [live, setLive] = useState(0);
  const [guess, setGuess] = useState("");
  const [usedWord, setUsedWord] = useState([]);
  const [pressedKeys, setPressedKeys] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfGuess, setNumberOfGuess] = useState(5);
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [isFailed, setIsFailed] = useState(false);
  const [isNotValidGusses, setIsNotValidGusses] = useState(false);
  const [correctWord, setCorrectWord] = useState("");
  const words = useSelector((state) => state.words);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function eventHandler({ key }) {
    if (key.toUpperCase() === "ENTER") {
      if (live > numberOfGuess) {
        return;
      }
      if (usedWord.includes(guess)) {
        setDuplicate(true);
        setGuess("");
        return;
      }
      if (!words.includes(guess.toUpperCase())) {
        setIsNotValidGusses(true);
        return;
      }
      if (guess.length !== numberOfGuess) {
        return;
      }
      const formatted = editGuess();
      addGuess(formatted);
    }
    if (key.toUpperCase() === "BACKSPACE" || key === "DELETE") {
      setGuess((prev) => prev.slice(0, -1));
      setDuplicate(false);
      setIsNotValidGusses(false);
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (guess.length < numberOfGuess) {
        setGuess((prev) => prev + key.toUpperCase());
        setDuplicate(false);
        setIsNotValidGusses(false);
      }
    }
  }

  useEffect(() => {
    setGuesses([...Array(numberOfGuess + 1)]);
    if (words) {
      const selectedWord = words[Math.floor(Math.random() * words.length)];
      console.log("Answer---", selectedWord);
      setCorrectWord(selectedWord);
    }
  }, [numberOfGuess, words]);

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  function addGuess(formattedGuess) {
    if (guess.toUpperCase() === correctWord) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[live] = formattedGuess;
      return newGuesses;
    });
    setUsedWord((prevUsedWord) => {
      return [...prevUsedWord, guess];
    });
    setLive((prevLive) => {
      return prevLive + 1;
    });
    setPressedKeys((prevPressedKeys) => {
      formattedGuess.forEach((letter) => {
        const currentColor = prevPressedKeys[letter.key];

        if (letter.color === Colors.GREEN) {
          prevPressedKeys[letter.key] = Colors.GREEN;
          return;
        }
        if (letter.color === Colors.YELLOW && currentColor !== Colors.GREEN) {
          prevPressedKeys[letter.key] = Colors.YELLOW;
          return;
        }
        if (
          letter.color === Colors.GREY &&
          currentColor !== (Colors.GREEN || Colors.YELLOW)
        ) {
          prevPressedKeys[letter.key] = Colors.GREY;
          return;
        }
      });

      return prevPressedKeys;
    });
    setGuess("");
  }

  function editGuess() {
    let correctWordArray = correctWord.split("");
    let formattedGuess = guess
      .toUpperCase()
      .split("")
      .map((l) => {
        return { key: l, color: Colors.GREY };
      });

    formattedGuess.forEach((l, i) => {
      if (correctWord[i] === l.key) {
        formattedGuess[i].color = Colors.GREEN;
        correctWordArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (correctWordArray.includes(l.key) && l.color !== Colors.GREEN) {
        formattedGuess[i].color = Colors.YELLOW;
        correctWordArray[correctWordArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  }

  function apiCall(selectedValue) {
    dispatch(fetchWords(selectedValue));
  }
  useEffect(() => {
    setNumberOfGuess(5);
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", eventHandler);
    if (isCorrect) {
      window.removeEventListener("keyup", eventHandler);
    }
    if (live > numberOfGuess) {
      window.removeEventListener("keyup", eventHandler);
    }
    const noChancesLeft = guesses.every(
      (g) => typeof g !== "undefined" || (Array.isArray(g) && g.length !== 0)
    );
    if (noChancesLeft) {
      setIsFailed(true);
    } else {
      setIsFailed(false);
    }
    return () => window.removeEventListener("keyup", eventHandler);
  }, [eventHandler, isCorrect, live, numberOfGuess, guesses]);

  function onCancel() {
    setNumberOfGuess(numberOfGuess);
    setModalVisible(false);
  }

  function refresh(guessCount = 5) {
    setNumberOfGuess(guessCount);
    setModalVisible(false);
    setIsCorrect(false);
    setDuplicate(false);
    apiCall(guessCount);
    setPressedKeys({});
    setLive(0);
    setUsedWord([]);
    setGuess("");
    setIsNotValidGusses(false);
    setGuesses([...Array(guessCount + 1)]);
  }

  return (
    <>
      {words && words.length && (
        <main className="flex flex-col h-full gap-4 font-sans bg-gradient-to-b from-gray-200 to-transparent">
          <div className="pb-6 flex justify-between pt-8 text-4xl border-b border-gray-300 bg-gradient-to-b ">
            <div className="flex-1 flex justify-center items-center">
              Wordle
            </div>
            <div className="flex items-center mr-2">
              <Settings onClick={() => setModalVisible(true)} />
            </div>
          </div>
          <Alert
            isCorrect={isCorrect}
            duplicate={duplicate}
            isFailed={isFailed}
            correctWord={correctWord}
            clickPlay={() => refresh(numberOfGuess)}
            isNotValidGusses={isNotValidGusses}
          />
          {modalVisible && (
            <Modal
              onClose={(selectedValue) => refresh(selectedValue)}
              onCancel={onCancel}
              numberOfGuess={numberOfGuess}
            />
          )}
          <Board
            guesses={guesses}
            currentGuess={guess}
            live={live}
            n={numberOfGuess}
          />
          <Keyboard onKeyPress={eventHandler} pressedKeys={pressedKeys} />
          <div className="pb-6 pt-10 self-center text-l">By Ankita Gupta</div>
        </main>
      )}
    </>
  );
}
