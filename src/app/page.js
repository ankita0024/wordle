"use client";

import Board from "./components/board";
import Keyboard from "./components/keyboard";
import { useEffect, useState } from "react";
import solution from "./solution.json";
import Modal from "./components/modal";
import Settings from "./components/settings";

export default function Home() {
  const [live, setLive] = useState(0);
  const [guess, setGuess] = useState("");
  const [usedWord, setUsedWord] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfGuess, setNumberOfGuess] = useState(5);
  const [guesses, setGuesses] = useState([...Array(numberOfGuess + 1)]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function eventHandler(event) {
    if (event.toUpperCase() === "ENTER") {
      if (live > numberOfGuess) {
        return;
      }
      if (usedWord.includes(guess)) {
        setError(true);
        return;
      }
      if (guess.length !== numberOfGuess) {
        return;
      }
      const formatted = editGuess();
      addGuess(formatted);
      console.log(formatted);
    }
    if (event.toUpperCase() === "BACKSPACE" || event === "DELETE") {
      setGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(event)) {
      if (guess.length < numberOfGuess) {
        setGuess((prev) => prev + event);
      }
    }
  }
  useEffect(() => {
    setGuesses([...Array(numberOfGuess + 1)]);
  }, [numberOfGuess]);
  function addGuess(formattedGuess) {
    if (guess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[live] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setLive((prevLive) => {
      return prevLive + 1;
    });
    setGuess("");
  }

  function editGuess() {
    let solutionArray = [...solution];
    let formattedGuess = [...guess].map((l) => {
      return { key: l, color: "grey" };
    });

    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  }

  useEffect(() => {
    const listener = (event) => {
      if (event) {
        eventHandler(event.key);
      }
    };
    window.addEventListener("keyup", listener);
  }, [eventHandler]);
  function onClose(selectedValue) {
    setNumberOfGuess(selectedValue);
    setModalVisible(false);
  }
  return (
    <main className="flex flex-col h-full gap-4 font-sans bg-gradient-to-b from-gray-200 to-transparent">
      <div className="pb-6 flex justify-between pt-8 text-4xl border-b border-gray-300 bg-gradient-to-b ">
        <div className="flex-1 flex justify-center items-center">Wordle</div>
        <div className="flex items-center mr-2">
          <Settings onClick={() => setModalVisible(true)} />
        </div>
      </div>
      {error && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Duplicate value!!</strong>
        </div>
      )}
      {modalVisible && (
        <Modal onClick={onClose} numberOfGuess={numberOfGuess} />
      )}
      <Board guesses={guesses} guess={guess} live={live} n={numberOfGuess} />
      <Keyboard onClick={eventHandler} />
      <div className="pb-6 pt-10 self-center text-xl">By Ankita Gupta</div>
    </main>
  );
}
