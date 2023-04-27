import React from "react";

const keys = [
  [{key:"Q"},{key:"W"},{key:"E"},{key:"R"},{key:"T"},{key:"Y"},{key:"U"},{key:"I"},{key:"O"},{key:"P"}],
  [{key:"A"},{key:"S"},{key:"D"},{key:"F"},{key:"G"},{key:"H"},{key:"J"},{key:"K"},{key:"L"}],
  [{key:"ENTER"},{key:"Z"},{key:"X"},{key:"C"},{key:"V"},{key:"B"},{key:"N"},{key:"M"},{key:"DELETE"}],
];

function Keyboard({ onKeyPress, pressedKeys }) {

  function handleClick(obj) {
    onKeyPress(obj);
  };
 
  return (
    <div className="flex flex-col pb-10">
      {keys && keys.map((row, index) => (
        <div className="flex justify-center" key={index}>
          {row.map((obj,i) => {
            const color = pressedKeys[obj.key]
            return (
             <button key={i}
             className={`${color ? color : 'bg-gray-900'} text-white font-bold py-2 px-4 rounded uppercase m-0.5`}
             onClick={() => handleClick(obj)}
           >
             {obj.key}
           </button>
          )
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
