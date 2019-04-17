
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';

const DAS_INITIAL_DELAY = 16;
const DAS_REFRESH_DELAY = 6;

export type Action = Tick | Input;

export type Direction = 'LEFT' | 'RIGHT' | 'DOWN';
export type InputType = 'NONE' | Direction;
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

  dasDirection: InputType,
  dasDelay: number

  dropDelay: number
  board: number[][]
};

export const INITIAL: State = {
  width: 12,
  height: 24,
  activeShape: { shapeIdx: 10, dRow: 0, dCol: 0 },
  dasDirection: 'NONE',
  dasDelay: 0,
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

function attemptTranslateDirection(s: State, d: Direction): boolean {
  switch (d) {
    case 'LEFT':
      return attemptTranslateActive(s, 0, -1);
    case 'DOWN':
      return attemptTranslateActive(s, 1, 0);
    case 'RIGHT':
      return attemptTranslateActive(s, 0, 1);
  }
}

function doTick(s: State): State {
  return produce(s, s => {
    if (s.dropDelay == 0) {
      s.dropDelay = 60
      attemptTranslateActive(s, 1, 0);
    } else {
      s.dropDelay--;
    }

    if (s.dasDirection != 'NONE') {
      if (s.dasDelay == 0) {
        s.dasDelay = DAS_REFRESH_DELAY;
        attemptTranslateDirection(s, s.dasDirection);
      } else {
        s.dasDelay--;
      }
    }
  });
}

function doInput(s: State, a: Input): State {
  return produce(s, s => {
    switch (a.input) {
      case 'NONE':
        s.dasDirection = 'NONE';
        break;
      case 'LEFT':
      case 'RIGHT':
      case 'DOWN':
        if (s.dasDirection == 'NONE') {
          s.dasDelay = DAS_INITIAL_DELAY;
          attemptTranslateDirection(s, a.input);
        }
        s.dasDirection = a.input;
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
