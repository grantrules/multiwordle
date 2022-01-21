import { readFile } from 'fs';
import { promisify } from 'util';

export default async function getWords() {
  const r = promisify(readFile);
  const words = await r('./words', 'utf8');
  const wordlist = words.split('\n');
  const lengthMap = wordlist.reduce((acc, cur) => acc.set(cur.length, [...(acc.get(cur.length) ?? []), cur]), new Map());
  return {
    wordlist,
    lengthMap,
    getWord(length) {
      const list = length > 2 && lengthMap.has(length) ? lengthMap.get(length) : wordlist;
      return list[Math.floor(Math.random() * list.length)];
    },
  };
}
