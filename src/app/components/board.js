import Row from "./row";
export default function Board({guesses, currentGuess,live,n}) {


  return (
    <div className="mt-16">
     {/* {[...Array(n)].map((_, index) => (
          <div key={index} className="flex">
            {guesses[index] && guesses[index].map((letter, index) => (
              <div key={index} className={`w-8 h-8 rounded-lg mr-2 mb-2 ${letter.color}`}>{letter.key}</div>
            ))}
            {!guesses[index] && [...Array(n - index)].map((_, index) => (
              <div key={index} className="bg-gray-300 w-8 h-8 rounded-lg mr-2 mb-2"></div>
            ))}
          </div>
        ))} */}
    {guesses.map((g, i) => {
      if (live === i) {
        return <Row key={i} currentGuess={currentGuess} n={n} />;
      }
      return <Row key={i} guess={g} n={n} />;
    })}
  </div>
  );
}
