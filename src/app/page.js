import Board from "./components/board"
import Keyboard from "./components/keyboard"
import Row from "./components/board";
import Tile from "./components/tile";

export default function Home() {
  return (
    <main className="flex flex-col h-full gap-4 font-sans bg-gradient-to-b from-gray-200 to-transparent">
     
       <div className="pb-6 pt-8 flex w-full justify-center text-4xl border-b border-gray-300 bg-gradient-to-b ">
          Wordle
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-800 shadow"></div>
       
        </div>
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Holy smokes!</strong>
</div>
      {/* <div className=""> */}
     <Board ></Board>
       <Keyboard></Keyboard>
      {/* </div> */}
      <div className="pb-6 pt-10 self-center text-xl">
            By Ankita Gupta
           
        </div>
    </main>
  )
}
