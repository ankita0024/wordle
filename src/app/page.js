"use client";

import Game from "./components/game";
import { useEffect, useState } from "react";


export default function Home() {
  const [correctWord, setCorrectWord] = useState(null)
   async function fetchData(wordLength = 5) {
   let response = await fetch(`https://random-word-api.herokuapp.com/word?length=${wordLength}`)
      const data = await response.json();
        setCorrectWord(data[0])
  }
  useEffect(() => {
    fetchData()
  }, [])



  return (
   <>{correctWord && <Game correctWord={correctWord.toUpperCase()} fetchData={fetchData} ></Game>}</>
  );
}
