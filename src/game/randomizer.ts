import Prando from "prando";

import * as shape from "./shape";

export interface Randomizer {
  nextShape(): number;
}

export class TrueRandomizer implements Randomizer {
  rand: Prando;

  constructor(rand: Prando) {
    this.rand = rand;
  }

  nextShape(): number {
    return this.rand.nextInt(0, shape.NUM_SHAPES - 1);
  }
}

export class NBagRandomizer implements Randomizer {
  rand: Prando;
  n: number;
  bag: number[];

  constructor(rand: Prando, n: number) {
    this.rand = rand;
    this.n = n;
    this.bag = [];
  }

  nextShape(): number {
    if (this.bag.length === 0) {
      this.bag = Array.from(
        { length: this.n * shape.NUM_SHAPES },
        (_, k) => k % shape.NUM_SHAPES,
      );
      shuffle(this.bag, this.rand);
    }
    return this.bag.pop() as number;
  }
}

function shuffle<T>(array: T[], rand: Prando) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(rand.next() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
