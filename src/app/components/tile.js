export default function Tile(props) {

return(
    <div
          key={`${props.rowIndex}-${props.colIndex}`}
          className="bg-gray-200 h-10 w-10 border border-gray-400 flex justify-center items-center rounded"
        >
          {props.cell}
        </div>
    // <div class="border border-gray-300 p-4"> 
    // </div>
)
}

