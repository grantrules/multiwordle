/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { client, join, host } from '../utils/game';
import Ctx from '../Ctx';
import Room from './Room';
import { BackBtn } from './Buttons';

function RoomCode({ joinRoom }) {
  const [value, setValue] = useState('');

  const updateValue = (e) => setValue(e.target.value);

  return (
    <>
      <input type="text" name="roomCode" value={value} onChange={updateValue} size="4" className="large-input" />
      <button type="button" onClick={() => joinRoom(value)}>Join</button>
    </>
  );
}

function StartGame({
  name, hostGame, joinRoom, error, Back,
}) {
  return (
    <>
      <h2>
        Welcome
        {name}
      </h2>
      <div className="roomchoice">
        <fieldset>
          <h3>
            Start a game with 4 players
          </h3>
          <button type="button" onClick={hostGame}>Host Game</button>
        </fieldset>
        <fieldset>
          <h3>
            Enter the game code:
          </h3>
          <RoomCode joinRoom={joinRoom} />
          {error && <div className="error">{error}</div>}
        </fieldset>
      </div>

      <div>{Back}</div>
    </>
  );
}

export default function Lobby({ Back }) {
  console.log('rendering lobby');
  console.log(client);

  const store = React.useContext(Ctx);
  const playerName = store.use(() => store.get('playerName'));
  const playerWeight = store.use(() => store.get('playerWeight'));
  const gameRoom = store.use(() => store.get('gameRoom'));

  const [error, setError] = useState(null);
  const connected = client !== null;
  const inRoom = gameRoom !== null;

  // const [lobbyState, setLobbyState] = useState('start');

  const onStateChange = (state) => {
    store.set('gameState', state);
  };

  const onMessage = (message) => {
    console.log('react getting message', message);
  };

  const joinRoom = (roomId) => join(roomId, playerName, Number(playerWeight.weight), onStateChange, onMessage).then((room) => store.set('gameRoom', room))
    .catch((e) => setError(e.message));

  const hostGame = () => host(playerName, Number(playerWeight.weight), onStateChange, onMessage).then((room) => store.set('gameRoom', room));

  return (
    <>
      {!connected
      && (
      <>
        <h1>Not connected to server</h1>
        <button type="button" onClick={() => { /* connect(); */ }}>Reload</button>
      </>
      )}

      {connected && !inRoom
      && (
      <StartGame
        name={playerName}
        hostGame={hostGame}
        joinRoom={joinRoom}
        error={error}
        Back={Back}
      />
      )}

      {inRoom && <Room Back={<BackBtn onClick={() => { store.set('gameRoom', null); gameRoom.leave(); store.set('gameChat', []); }} />} />}

    </>
  );
}
