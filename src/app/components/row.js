export default function Row({key,guess,n}) {
  let letters= "";
  if(guess){
     letters = guess.split('');
  }
    return (
      <div className="flex items-center row justify-center">
      {letters && letters.map((letter, i) => (
        <div key={i} className="bg-gray-300 text-gray-800 w-8 h-8 flex justify-center items-center rounded-lg mr-2 mb-2">
          {letter}
        </div>
      ))}
      {[...Array(n - letters.length)].map((_, i) => (
        <div key={i} className="bg-gray-300 w-8 h-8 rounded-lg mr-2 mb-2"></div>
      ))}
    </div>
    )
   
}