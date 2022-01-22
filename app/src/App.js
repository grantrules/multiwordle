import React from 'react';
import Game from './components/Game';
import Ctx from './Ctx';
import Store from './store/Store';

const names = ['Stephen King', 'Ayn Rand', 'Michael Chrichton', 'Anne Rice', 'Mark Twain', 'Voltaire', 'J.K. Rowling'];
const pickName = () => names[Math.floor(Math.random() * names.length)];

function App() {
  const [store] = React.useState(() => {
    const s = new Store();

    // player context
    const storedData = JSON.parse(localStorage.getItem('wordle') || '{}');
    s.set('playerName', storedData.name || pickName());

    // game context
    s.set('gameClient', nulll);
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
