import * as schema from '@colyseus/schema';
import Player from './Player.js';

export default class State extends schema.Schema {
  constructor() {
    super();
    this.wordLength = 5;
    this.word = '';
    this.players = new schema.MapSchema();
    this.gameState = false;
  }
}

schema.defineTypes(State, {
  players: { map: Player },
  wordLength: 'number',
  word: 'string',
  gameState: 'string',
});
