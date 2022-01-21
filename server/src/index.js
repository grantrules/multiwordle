// Colyseus + Express
import { Server, RedisPresence } from 'colyseus';
import { WebSocketTransport } from '@colyseus/ws-transport';
import { createServer } from 'http';
import express from 'express';
import WordleRoom from './rooms/WordleRoom.js';
import getWords from './words.js';

const port = Number(process.env.port) || 2568;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
    presence: new RedisPresence({ host: 'redis' }),
  }),
});

const words = await getWords();
console.log(words.getWord(5));

gameServer.define('wordle', WordleRoom, { words });
gameServer.listen(port);
