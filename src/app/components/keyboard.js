import React from "react";
// import { useEffect, useState } from "react";

function Keyboard({ onClick, pressedKeys }) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ];
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      rows[i][j] = {key: rows[i][j], color:null};
    }
  }

  console.log("pressedKeys", pressedKeys);
  return (
    <div className="flex flex-col pb-10">
      {rows.map((row, index) => 
      {
        return (
        <div className="flex justify-center" key={index}>
          {row.map((letter) => 
          { if(pressedKeys) {const color = pressedKeys[letter.key]
            return (
            <button key={letter.key} onClick={onClick(letter.key)}
              className={`bg-gray-800 text-white font-bold py-2 px-4 rounded uppercase m-0.5 ${color}`}
            >
              {letter.key}
            </button>
          )
            }else{
              return (
                <button key={letter.key} onClick={onClick(letter.key)}
                  className="bg-gray-800 text-white font-bold py-2 px-4 rounded uppercase m-0.5"
                >
                  {letter.key}
                </button>
              )
            }
        }
          )}
        </div>
      )}
      )}
    </div>
  );
}

export default Keyboard;
