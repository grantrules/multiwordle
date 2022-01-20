/* eslint-disable react/prop-types */
import React from 'react';
import Ctx from '../Ctx';

function Player({ player }) {
  return (player.name);
}

function Players() {
  const store = React.useContext(Ctx);
  const gamePlayers = store.use(() => store.get('gameState').players);

  return (
    <ul>
      {gamePlayers.values().map(
        // eslint-disable-next-line react/no-array-index-key
        (player, n) => (<li key={n}><Player player={player} /></li>),
      )}
    </ul>
  );
}

export { Players, Player };
