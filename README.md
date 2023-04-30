This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.js`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Wordle App with new features 

Wordle is a simple game in which you have to guess a 5 to 8 letter (n) word. You get (n+1) guesses,
learning a little more information with each guess, and eventually narrow your guesses down to
find the answer.

## TradeOffs
> My first ever project in Next.js, required bit of a hands on!! But enjoyed working on it!

> Started with Basic UI structure, designed it using Tail wind css. Again, never worked on Tailwind before but was easy to get going with it using its documentation.

> For store, used Redux + Thunk, saving valid word gusses coming in chunks from API, arraning those chunks, handling edge cases and randomly fetching a valid word of number of selected letter.

> Duplicate check added with Alert messages

> Store fetching word list from my own created API using AWS dynamo, again for the first time. Really enjoyed working on AWS :) 

Hope you enjoy the game!!

