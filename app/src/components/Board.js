import React from 'react';

const range = (n) => Array.from({ length: n }, (_, x) => x);

// eslint-disable-next-line react/prop-types
export default function Board({ numGuesses, wordLength }) {
  return (
        <>
        {range(numGuesses).map((guess) => (<div key={guess}>{
          range(wordLength).map((letter) => (
            <span key={letter}>x</span>
          ))
        }</div>))}
        </>
  );
}
