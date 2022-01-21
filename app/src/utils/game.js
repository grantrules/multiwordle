import * as Colyseus from 'colyseus.js';

const connect = () => {
  console.log('Connecting...');
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const host = window.location.port === '3000' ? 'localhost:2568' : window.location.host;
  const client = new Colyseus.Client(`${protocol}://${host}` /* :2567' */);
  return client;
};

const client = connect();

// eslint-disable-next-line import/no-mutable-exports
let joinedRoom;

const finishJoin = (onStateChange, onMessage) => (room) => {
  joinedRoom = room;
  room.onStateChange.once((state) => {
    console.log('this is the first room state!', state);
    onStateChange(state);
  });
  room.onStateChange((state) => {
    console.log('the room state has been updated:', state);
    onStateChange(state);
  });
  room.onMessage((message) => {
    console.log('message received');
    console.log(message);
    onMessage(message);
  });
  room.onLeave(() => {
    console.log('something left');
  });
  room.onError(() => {
    console.log('error');
  });
  return room;
};

const join = (roomId, name, onStateChange, onMessage) => {
  const joinRoom = finishJoin(onStateChange, onMessage);
  return client.joinById(roomId, { playerName: name })
    .then((room) => joinRoom(room))
    .catch((err) => {
      const error = err?.message?.indexOf('not found') ? 'Room not found' : 'Error joining room';
      throw new Error(error);
    });
};

const host = (name, onStateChange, onMessage) => {
  const joinRoom = finishJoin(onStateChange, onMessage);
  return client.create('room', { playerName: name })
    .then((room) => joinRoom(room));
};

export {
  client, join, host, joinedRoom,
};
