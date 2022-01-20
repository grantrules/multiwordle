import * as schema from '@colyseus/schema';

export default class Player extends schema.Schema {
  constructor(name) {
    super();
    this.name = name;
    this.guesses = new schema.ArraySchema();
    this.ready = false;
  }

  isComplete() {
    return this.guesses.length && this.guesses.includes('x'.repeat(this.guesses.length));
  }
}
schema.defineTypes(Player, {
  name: 'string',
  guesses: ['string '],
  ready: 'boolean',
});
