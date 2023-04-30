export default function Alert({isCorrect,duplicate, clickPlay, isFailed, correctWord, isNotValidGusses}) {
  return (
  <>
    {isCorrect && <div
      class="flex items-center justify-center h-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mr-24 ml-24"
      role="alert"
    >
      <p class="font-bold text-center">Winner Winner Chicken Dinner!! <span class="cursor-pointer underline" onClick={()=>clickPlay()}>Play again?</span></p>
    </div>}
    {(duplicate || isNotValidGusses) && <div
          className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 mr-24 ml-24 rounded relative"
          role="alert"
        >
         {duplicate && <strong className="font-bold">Duplicate value!!</strong>}
         {isNotValidGusses && <strong className="font-bold">The word is not in the list! Try another word!!</strong>}
        </div>}
    {isFailed && <div
      class="flex items-center justify-center h-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mr-24 ml-24"
      role="alert"
    >
      <p class="font-bold text-center">{`The word was ${correctWord.toUpperCase()}. Better luck next time!`} <span class="cursor-pointer underline" onClick={()=>clickPlay()}>Try again!!</span></p>
    </div>}
    </>
  );
}
