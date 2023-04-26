import React from "react";
import { useEffect, useState } from "react";

function Key(props) {
  const handleClick = (event) => {
    console.log("clickedd");
    props.onClick(props.value);
  };

  return (
    <button
      className="bg-gray-800 text-white font-bold py-2 px-4 rounded uppercase m-0.5"
      onClick={handleClick}
    >
      {props.value}
    </button>
  );
}

function Keyboard({ onClick }) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ];

  return (
    <div className="flex flex-col pb-10">
      {rows.map((row, index) => (
        <div className="flex justify-center" key={index}>
          {row.map((key) => (
            <Key onClick={onClick} key={key} value={key} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
