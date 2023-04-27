import React from "react";

const keys = [
  [{key:"Q"},{key:"W"},{key:"E"},{key:"R"},{key:"T"},{key:"Y"},{key:"U"},{key:"I"},{key:"O"},{key:"P"}],
  [{key:"A"},{key:"S"},{key:"D"},{key:"F"},{key:"G"},{key:"H"},{key:"J"},{key:"K"},{key:"L"}],
  [{key:"ENTER"},{key:"Z"},{key:"X"},{key:"C"},{key:"V"},{key:"B"},{key:"N"},{key:"M"},{key:"DELETE"}],
];
// for (let i = 0; i < keys.length; i++) {
//   for (let j = 0; j < keys[i].length; j++) {
//     keys[i][j] = {key: keys[i][j]};
//   }
// }

function Keyboard({ onKeyPress }) {
  // const rows = [
  //   ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  //   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  //   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  // ];

  function handleClick(obj) {
    onKeyPress(obj);
  };
  // const [letters, setLetters] = useState(null)

  // useEffect(() => {
  //   setLetters(keys)
  // }, [setLetters])

  return (
    <div className="flex flex-col pb-10">
      {keys && keys.map((row, index) => (
        <div className="flex justify-center" key={index}>
          {row.map((obj,i) => (
             <button key={i}
             className="bg-gray-800 text-white font-bold py-2 px-4 rounded uppercase m-0.5"
             onClick={() => handleClick(obj)}
           >
             {obj.key}
           </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
