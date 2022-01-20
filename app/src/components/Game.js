import React, { useState } from 'react';
import Lobby from './Lobby';
import { Details } from './Details';
import { NextBtn, BackBtn, Button } from './Buttons';

// eslint-disable-next-line react/prop-types
function About({ Back }) {
  return (
    <fieldset>
      <legend>About</legend>
      <p>
        Hi, I made this for fun after playing Wordle
        {' '}
      </p>
      <p>I&apos;m looking for a neat job</p>
      <p>
        You can check out the project on
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/grantrules/multiwordle">GitHub</a>
      </p>
      {Back}
    </fieldset>
  );
}

function Game() {
  const [gameState, setGameState] = useState('details');
  const isGameState = (state) => state === gameState;
  console.log('rendering game...');

  return (
    <>
      <header className="logo">
        Wordle
      </header>
      <section>

        {isGameState('details')
              && (
              <Details Next={(
                <>
                  <NextBtn onClick={() => setGameState('lobby')} />
                  <Button txt="About" onClick={() => setGameState('about')} />
                </>
)}
              />
              )}

        {isGameState('lobby')
              && <Lobby Back={(<BackBtn onClick={() => setGameState('details')} />)} />}

        {isGameState('about')
              && <About Back={(<BackBtn onClick={() => setGameState('details')} />)} />}

      </section>

    </>
  );
}

export default Game;
