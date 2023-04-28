
export default function Row({currentGuess,n,guess}) {
  
  if (guess) {
    return (
      <div className="flex items-center row justify-center">
        {guess.map((letter, i) => (
          <div key={i} className={`${letter.color} text-gray-800 w-8 h-8 flex justify-center items-center rounded-lg mr-2 mb-2 uppercase`}>{letter.key}</div>
        ))}
      </div>
    )
  }
    if (currentGuess) {
      let letters = currentGuess.split('')
      return (
        <div className="flex items-center row justify-center">
        {letters.map((letter, i) => (
          <div key={i} className="bg-gray-300 text-gray-800 w-8 h-8 flex justify-center items-center rounded-lg mr-2 mb-2 uppercase">{letter}</div>
        ))}
        {[...Array(Math.max(n - letters.length, 0))].map((_,i) => (
          <div key={i} className="bg-gray-300 w-8 h-8 rounded-lg mr-2 mb-2"></div>
        ))}
      </div>
      )
    }
  
    return (
      <div className="flex items-center row justify-center">
      {[...Array(n)].map((_,i) => (
        <div key={i} className="bg-gray-300 w-8 h-8 rounded-lg mr-2 mb-2"></div>
      ))}
   </div>
    )
}
