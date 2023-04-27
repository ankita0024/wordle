import Row from "./row";
export default function Board({guesses, currentGuess,live,n}) {


  return (
    <div className="mt-16">
    {guesses.map((g, i) => {
      if (live === i) {
        return <Row key={i} currentGuess={currentGuess} n={n} />;
      }
      return <Row key={i} guess={g} n={n} />;
    })}
  </div>
  );
}
