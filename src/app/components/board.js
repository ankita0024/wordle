import Row from "./row";
export default function Board({guesses, guess,live,n}) {

  return (
    <div className="mt-16">
    {guesses.map((g, i) => {
      console.log("g----",g);
      if (live === i) {
        return <Row key={i} guess={guess} n={n} />;
      }
      return <Row key={i} guess={g} n={n} />;
    })}
  </div>
  );
}
