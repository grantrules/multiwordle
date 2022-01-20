/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import Ctx from '../Ctx';

function Details({ Next }) {
  return (
    <>
      <div className="details">
        <PlayerDetailScreen />
      </div>
      {Next}
    </>
  );
}

function PlayerInput({ name, title, Input }) {
  return (
    <div className={`${name}-playerInput playerInput`}>
      <div className="title">
        {title}
        :
      </div>
      {Input}
    </div>
  );
}

function PlayerDetailScreen() {
  const store = React.useContext(Ctx);
  const name = store.use(() => store.get('playerName'));

  useEffect(() => () => {
    const data = { name };
    localStorage.setItem('wordle', JSON.stringify(data));
  }, [name]);

  const handleChange = (field) => (e) => store.set(field, e.target.value);

  return (
    <fieldset className="player">
      <legend>Player</legend>
      <PlayerInput
        name="name"
        title="Player Name"
        Input={<input type="text" name="playerName" maxLength="16" value={name} onChange={handleChange('playerName')} />}
      />
    </fieldset>
  );
}

export { Details, PlayerDetailScreen };
