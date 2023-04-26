"use client";

import Board from "./components/board";
import Keyboard from "./components/keyboard";
import { useEffect, useState } from "react";
import Modal from "./components/modal";
import Settings from "./components/settings";

const Colors = {
  GREY: 'grey',
  GREEN: 'green',
  YELLOW: 'yellow'
};


export default function Home() {
  const [live, setLive] = useState(0);
  const [guess, setGuess] = useState("");
  const [usedWord, setUsedWord] = useState([]);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [numberOfGuess, setNumberOfGuess] = useState(5);
  const [guesses, setGuesses] = useState([]);
  const [pressedKeys, setPressedKeys] = useState({}) 
  const [correctWord, setCorrectWord] = useState([])

  useEffect(() => {
    (async function() {
      await fetch(`https://random-word-api.herokuapp.com/word?length=5`).then(response=>
      {
        setCorrectWord(response[0])
      })
      
    })()
  }, [setCorrectWord])

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
    if (guess === correctWord) {
      setResult(true);
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
    setPressedKeys(pressedKeys => {
      formattedGuess.forEach(letter => {
        const currentColor = pressedKeys[letter.key]

        if (letter.color === Colors.GREEN) {
          pressedKeys[letter.key] = Colors.GREEN
          return
        }
        if (letter.color === Colors.YELLOW && currentColor !== Colors.GREEN) {
          pressedKeys[letter.key] =  Colors.YELLOW
          return
        }
        if (letter.color === Colors.GREY && currentColor !== (Colors.GREEN ||  Colors.YELLOW)) {
          pressedKeys[letter.key] = Colors.GREY
          return
        }
      })

      return pressedKeys
    })
    setGuess("");
  }

  function editGuess() {
    let correctWordArray = [...correctWord];
    let formattedGuess = [...guess].map((letter) => {
      return { key: letter, color: Colors.GREY };
    });

    formattedGuess.forEach((letter, i) => {
      if (correctWord[i] === letter.key) {
        formattedGuess[i].color = Colors.GREEN;
        correctWordArray[i] = null;
      }
    });

    formattedGuess.forEach((letter, i) => {
      if (correctWordArray.includes(letter.key) && letter.color !== Colors.GREEN) {
        formattedGuess[i].color =  Colors.YELLOW;
        correctWordArray[correctWordArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  }
  useEffect(() => {
    window.addEventListener('keyup', eventHandler)
    if (result) {
      window.removeEventListener('keyup', eventHandler)
    }
    if (live > 5) {
      window.removeEventListener('keyup', eventHandler)
    }
    return () => window.removeEventListener('keyup', eventHandler)
  }, [eventHandler,live,result])
  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event) {
  //       eventHandler(event.key);
  //     }
  //   };
  //   window.addEventListener("keyup", listener);
  // }, [eventHandler]);
  function onClose(selectedValue) {
    setNumberOfGuess(selectedValue);
    setModalVisible(false);
  }
  return (
    <>{correctWord && 
    <main className="flex flex-col h-full gap-4 font-sans bg-gradient-to-b from-gray-200 to-transparent">
      <div className="pb-6 flex justify-between pt-8 text-4xl border-b border-gray-300 bg-gradient-to-b ">
        <div className="flex-1 flex justify-center items-center">Wordle</div>
        <div className="flex items-center mr-2">
          <Settings onClick={() => setModalVisible(true)} />
        </div>
      </div>
      {error && !result && (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Duplicate value!!</strong>
        </div>
      )}
      {result && !error && (
       <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
       <div class="flex">
         <div>
           <p class="font-bold">Winner Winner Chicken Dinner</p>
         </div>
       </div>
     </div>
      )}
      {modalVisible && (
        <Modal onClick={onClose} numberOfGuess={numberOfGuess} />
      )}
      <Board guesses={guesses} guess={guess} live={live} n={numberOfGuess} />
      <Keyboard onClick={eventHandler}  pressedKeys={pressedKeys}/>
      <div className="pb-6 pt-10 self-center text-l">By Ankita Gupta</div>
    </main>}
    </>
  );
}
