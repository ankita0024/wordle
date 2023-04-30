"use client";

import Game from "../components/game";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchWords } from '../store/action';

export default function App() {
  const words = useSelector(state => state.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  return (
   <>{words && <Game/>}</>
  );
}
