import * as schema from '@colyseus/schema';
import Player from './Player.js';

export default class State extends schema.Schema {
  constructor(maxClients) {
    super();
    this.wordLength = 5;
    this.word = '';
    this.players = new schema.MapSchema();
    this.gameState = 'lobby';
    this.maxClients = maxClients;
  }
}

schema.defineTypes(State, {
  players: { map: Player },
  maxClients: 'number',
  wordLength: 'number',
  word: 'string',
  gameState: 'string',
});
