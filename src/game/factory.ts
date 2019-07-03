import Prando from 'prando';

import * as gs from './state';
import * as randomizer from './randomizer';

export function newProdViewAndController(): [gs.View, gs.Controller] {
  const levelTable = Array.from({ length: 37 }, (_, idx): gs.LevelInfo => ({
    number: idx + 1,
    gravity: levelToGravity(idx),
    multiplier: gravityToLevel(levelToGravity(idx)) + 1
  }));

  const gameView = new gs.View(levelTable)
  const gameController = new gs.Controller(
    new randomizer.NBagRandomizer(new Prando(), 2),
    gameView);

  return [gameView, gameController];
}

function levelToGravity(l: number): number {
  return Math.floor(48 * Math.pow(0.9, l));
}

function gravityToLevel(g: number): number {
  // Math.abs fixes a weird issue involving -0.
  return Math.abs(Math.floor(Math.log(g / 48) / Math.log(0.9)));
}
