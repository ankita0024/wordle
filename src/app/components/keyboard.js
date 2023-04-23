import React from "react";

function Key(props) {
  return (
    <button
      className="bg-gray-800 text-white font-bold py-2 px-4 rounded uppercase m-0.5"
      onClick={""}
    >
      {props.value}
    </button>
  );
}

function Keyboard(props) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER","Z", "X", "C", "V", "B", "N", "M","DELETE"],
  ];

  return (
    <div className="flex flex-col pb-10">
      {rows.map((row, index) => (
        <div className="flex justify-center" key={index}>
          {row.map((key) => (
            <Key key={key} value={key} onClick={props.onClick} />
          ))}
        </div>
      ))}
      {/* <div className="flex justify-between mt-4">
        <Key value="Enter" onClick={""} />
        <div className="w-16"></div>
        <Key value="Delete" onClick={""} />
      </div> */}
    </div>
  );
}

export default Keyboard;
