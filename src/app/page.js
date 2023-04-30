"use client";

import Game from "./components/game";
import { Provider } from "react-redux";
import store from './store/store';

export default function Home() {

  return (
    <Provider store={store}>
      <Game/>
    </Provider>
   
  );
}
