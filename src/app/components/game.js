"use client";

import Board from "./board";
import Keyboard from "./keyboard";
import { useEffect, useState } from "react";
import Modal from "./modal";
import Settings from "./settings";

const Colors = {
  GREY: "bg-gray-600",
  GREEN: "bg-lime-500",
  YELLOW: "bg-yellow-400"
};

export default function Game({ correctWord, fetchData }) {
  const [live, setLive] = useState(0);
  const [guess, setGuess] = useState("");
  const [usedWord, setUsedWord] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfGuess, setNumberOfGuess] = useState(5);
  const [guesses, setGuesses] = useState([...Array(6)]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function eventHandler({ key }) {
    if (key.toUpperCase() === "ENTER") {
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
    }
    if (key.toUpperCase() === "BACKSPACE" || key === "DELETE") {
      setGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (guess.length < numberOfGuess) {
        setGuess((prev) => prev + key);
      }
    }
  }
  useEffect(() => {
    setGuesses([...Array(numberOfGuess + 1)]);
  }, [numberOfGuess]);

  function addGuess(formattedGuess) {
    if (guess === correctWord) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[live] = formattedGuess;
      return newGuesses;
    });
    setUsedWord((prevHistory) => {
      return [...prevHistory, guess];
    });
    setLive((prevLive) => {
      return prevLive + 1;
    });
    setGuess("");
  }


  function editGuess() {
    let correctWordArray = correctWord.split("");
    let formattedGuess = guess.toUpperCase().split("").map((l) => {
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
    fetchData(selectedValue);
  }

  useEffect(() => {
    window.addEventListener("keyup", eventHandler);
    if (isCorrect) {
        window.removeEventListener('keyup', eventHandler)
      }
      if (live > numberOfGuess) {
        window.removeEventListener('keyup', eventHandler)
      }
    return () => window.removeEventListener("keyup", eventHandler);
  }, [eventHandler,isCorrect,live]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onClose(selectedValue) {
    setNumberOfGuess(selectedValue);
    setModalVisible(false);
    apiCall(selectedValue);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function onCancel() {
    setNumberOfGuess(numberOfGuess);
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
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Duplicate value!!</strong>
        </div>
      )}
      {modalVisible && (
        <Modal
          onClose={onClose}
          onCancel={onCancel}
          numberOfGuess={numberOfGuess}
        />
      )}
      <Board guesses={guesses} currentGuess={guess} live={live} n={numberOfGuess} />
      <Keyboard onKeyPress={eventHandler} />
      <div className="pb-6 pt-10 self-center text-xl">By Ankita Gupta</div>
    </main>
  );
}
