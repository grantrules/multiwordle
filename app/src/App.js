import React from 'react';
import Game from './components/Game';
import Ctx from './Ctx';
import Store from './store/Store';

function App() {
  const [store] = React.useState(() => {
    const s = new Store();

    // player context
    const storedData = JSON.parse(localStorage.getItem('wordle') || '{}');
    s.set('playerName', storedData.name || 'Stephen King');

    // game context
    s.set('gameClient', null);
    s.set('gameRoom', null);
    s.set('gameState', {});
    s.set('gameChat', []);
    s.set('connecting', false);
    s.set('connected', false);

    return s;
  });

  return (
    <main className="App">
      <Ctx.Provider value={store}>
        <Game />
      </Ctx.Provider>
    </main>
  );
}

export default App;
