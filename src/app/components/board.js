import Tile from "./tile";
export default function Board(props) {
  // let line = new Array(4)(4).fill("1");
  const line = Array.from({ length: 5 }, () =>
    Array.from({ length: 6 }, () => "")
  );
  return (
    <div className="m-auto grid grid-cols-5 gap-2 mt-10">
    {line.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Tile rowIndex={rowIndex} colIndex={colIndex} cell={cell}></Tile>
      ))
    )}
  </div>
  );
}
