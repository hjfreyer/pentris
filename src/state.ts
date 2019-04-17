
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';

export type Action = Tick | Input;

export type InputType = 'NONE' | 'LEFT' | 'RIGHT' | 'DOWN';
type Tick = { kind: 'tick' };
type Input = {
  kind: 'input'
  input: InputType
}

export type State = {
  width: number
  height: number
  activeShape: {
    shapeIdx: number
    dRow: number
    dCol: number
  },

  input: InputType
  dropDelay: number
  board: number[][]
};

export const INITIAL: State = {
  width: 12,
  height: 24,
  activeShape: { shapeIdx: 10, dRow: 0, dCol: 0 },
  input: 'NONE',
  dropDelay: 60,
  board: (() => {
    const board: number[][] = [];
    for (let i = 0; i < 24; i++) {
      board.push(Array(12).fill(0));
    }
    return board;
  })(),
};

function attemptTranslateActive(s: State, dRow: number, dCol: number): boolean {
  const [minRow, minCol, maxRow, maxCol] = shape.bbox(SHAPES[s.activeShape.shapeIdx]);
  if (minRow + s.activeShape.dRow + dRow < 0) {
    return false;
  }
  if (maxRow + s.activeShape.dRow + dRow >= s.height) {
    return false;
  }
  if (minCol + s.activeShape.dCol + dCol < 0) {
    return false;
  }
  if (maxCol + s.activeShape.dCol + dCol >= s.width) {
    return false;
  }

  s.activeShape.dRow += dRow;
  s.activeShape.dCol += dCol;

  return true;
}

function doTick(s: State): State {
  return produce(s, s => {
    if (s.dropDelay == 0) {
      s.dropDelay = 60
      attemptTranslateActive(s, 1, 0);
    } else {
      s.dropDelay--;
    }
  });
}

function doInput(s: State, a: Input): State {
  return produce(s, s => {
    s.input = a.input;
    switch (a.input) {
      case 'NONE':
        break;
      case 'LEFT':
        attemptTranslateActive(s, 0, -1);
        break;
      case 'DOWN':
        attemptTranslateActive(s, 1, 0);
        break;
      case 'RIGHT':
        attemptTranslateActive(s, 0, 1);
        break;
    }
  });
}

export function apply(s: State, a: Action): State {
  switch (a.kind) {
    case 'tick':
      return doTick(s);
    case 'input':
      return doInput(s, a);
  }
}
