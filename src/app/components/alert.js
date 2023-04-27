export default function Alert({isCorrect,error, clickPlay}) {
  return (
  <>
    {isCorrect && !error && <div
      class="flex items-center justify-center h-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md mr-24 ml-24"
      role="alert"
    >
      <p class="font-bold text-center">Winner Winner Chicken Dinner!! <span class="cursor-pointer underline" onClick={()=>clickPlay()}>Play again?</span></p>
    </div>}
    {!isCorrect && error && <div
          className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 mr-24 ml-24 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Duplicate value!!</strong>
        </div>}
    </>
  );
}
