/* eslint-disable react/prop-types */
import React from 'react';
import Ctx from '../Ctx';
import { Players } from './PlayerDetails';
import ChatRoom from './Chat';

function Countdown({ time }) {
  const [secs, setSecs] = React.useState(3);
  React.useEffect(() => {
    let t = time;
    // eslint-disable-next-line no-plusplus
    const int = setInterval(() => (t > 0 ? setSecs(--t) : clearInterval(int)), 1000);
    return () => {
      clearInterval(int);
    };
  }, [time, setSecs]);
  return (secs <= 0 ? 'GO' : `Starting in ${secs}...`);
}

function ShareCode() {
  const store = React.useContext(Ctx);

  const gameRoomId = store.use(() => store.get('gameRoom') && store.get('gameRoom').id);

  return (
    <>
      Give your friends this code:
      <h1>{gameRoomId}</h1>
    </>
  );
}

function LobbyDetails({ Back }) {
  const store = React.useContext(Ctx);
  const gameState = store.use(() => store.get('gameState'));
  const gamePlayers = store.use(() => store.get('gameState').players);
  const gameRoom = store.use(() => store.get('gameRoom'));

  const players = gamePlayers.values();

  const myState = gamePlayers.get(gameRoom.sessionId);
  const { ready } = myState || {};

  const readyClick = () => {
    gameRoom.send('ready', !ready);
  };
  return (
    <>
      <PlayerList players={players} maxClients={gameState.maxClients} />

      {gameState.countdown
      && <div><Countdown time={3} /></div>}
      {!gameState.countdown
      && (
        players.length !== gameState.maxClients
          ? <div>Waiting for more players</div>
          : <div>Waiting for everyone to click Ready</div>)}
      {Back}
      <Ready ready={ready} onClick={readyClick} />
    </>
  );
}

function InGameLobby({ Back }) {
  return (
    <>
      <ShareCode />
      <div className="roomlobby">
        <div>
          <LobbyDetails Back={Back} />
        </div>
        <fieldset>
          <legend>Chat</legend>

          <ChatRoom className="lobbychat" />
        </fieldset>
      </div>

    </>
  );
}

function InGame() {
  return (
    <>
      <Players />
      Three.js
    </>
  );
}

function Ready({ ready, onClick }) {
  const className = ready ? 'disabled' : 'enabled';
  return (
    <button type="button" onClick={onClick} className={`${className} readyBtn`}>Ready</button>
  );
}

function Filled({ player }) {
  const { ready, name } = player;
  const className = !ready ? 'notready' : '';
  return (<span className={className}>{name}</span>);
}

function Open() {
  return (<span className="disabled">-- Open --</span>);
}

function PlayerList({ players, maxClients }) {
  // creates list max number of players
  const playerList = Array.from({ length: maxClients }, (_, i) => players[i]);

  return (
    <>
      <h2>Players</h2>
      <ul className="playerList">
        {playerList.map(
          (player, n) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={n}>
              {n + 1}
              .
              {' '}
              {player ? <Filled player={player} /> : <Open />}
            </li>
          ),
        )}
      </ul>
    </>
  );
}

export default function Room({ Back }) {
  const store = React.useContext(Ctx);
  const gameState = store.use(() => store.get('gameState').gameState);

  return (
    <>

      {gameState === 'lobby'
      && <InGameLobby Back={Back} />}

      {gameState === 'game'
      && <InGame />}
    </>
  );
}
