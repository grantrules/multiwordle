import { Room } from '@colyseus/core';
import { customAlphabet } from 'nanoid';
import Player from './schema/Player.js';
import State from './schema/State.js';

const genId = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);

export default class WordleRoom extends Room {
  getNewWord() {
    return this.words.getWord(this.wordLength);
  }

  isWord(guess) {
    return this.words.lengthMap.get(this.wordLength).includes(guess);
  }

  getComparisonString(guess) {
    const check = (letter, pos) => (this.word[pos] === letter && 'x') || (this.word.includes(letter) ? 'o' : '_');
    return [...guess].map((x, i) => check(x, i));
  }

  onCreate({ words, wordLength = 5 }) {
    this.words = words;
    this.wordLength = wordLength;

    this.maxClients = 4;

    let roomId = genId();
    while (this.presence.hget('rooms', roomId) === '1') {
      roomId = genId();
    }
    this.roomId = roomId;
    this.presence.hset('rooms', roomId, '1');

    this.setState(new State(this.maxClients));

    this.onMessage('chat', (client, message) => {
      const msg = {
        from: this.state.players.get(client.sessionId).name,
        time: new Date().getTime(),
        message,
      };
      console.log(`chat from ${msg.from}: ${msg.message}`);
      this.broadcast('chat', msg);
    });

    this.onMessage('guess', (client, unnormalizedGuess) => {
      const player = this.state.players.get(client.sessionId);
      const guess = unnormalizedGuess.toLowerCase();
      if (!this.isWord(guess)) {
        client.send('guess', 'notword');
      } else {
        const guessResult = this.getComparisonString(guess);
        player.guesses.push(guessResult);
        if (player.isComplete()) {
          this.state.gameState = 'win';
        }
      }
    });

    this.onMessage('ready', (client, ready) => {
      this.state.players.get(client.sessionId).ready = !!ready;

      const players = [...this.state.players.values()];
      const numPlayers = players.filter(({ ready: r }) => r).length;
      if (players.length === numPlayers) {
        console.log('starting countdown');
        this.state.countdown = true;
        this.countdownTimer = setTimeout(() => this.startGame(), 5000);
      } else if (this.countdownTimer) {
        this.cancelCountdown();
      }
    });
  }

  cancelCountdown() {
    if (this.countdownTimer) {
      console.log('cancelling countdown');
      clearTimeout(this.countdownTimer);
      this.state.countdown = false;
    }
  }

  endGame() {
    this.state.gameState = 'lobby';
    this.state.players.entries().forEach(
      ([id, player]) => this.state.players.set(id, { ...player, guesses: [] }),
    );
  }

  startGame() {
    this.state.gameState = 'game';
    this.word = this.getNewWord();
  }

  onJoin(client, { name }) {
    this.state.players.set(client.sessionId, new Player(name));
    console.log(`client: ${client.sessionId}, name: ${name} joined!`);
    this.cancelCountdown();
  }

  onLeave(client, consented) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, 'left', consented && ' of their own free will');
  }

  onDispose() {
    this.presence.hdel('rooms', this.roomId);
  }
}
