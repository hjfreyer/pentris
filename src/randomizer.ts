
import Prando from 'prando';

import SHAPES from './shapes';

export interface Randomizer {
  nextShape(): number
}

export class TrueRandomizer implements Randomizer {
  rand: Prando

  constructor(rand: Prando) {
    this.rand = rand;
  }

  nextShape(): number {
    return this.rand.nextInt(0, SHAPES.length - 1);
  }
}
