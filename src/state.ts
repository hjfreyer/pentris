
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';

export type Action = Tick | Translate;

type Tick = { kind: 'tick' };
type Translate = {
  kind: 'translate';
  dRow: number;
  dCol: number;
}

export type State = {
  width: number,
  height: number,
  board: number[][],
  activeShape: {
    shapeIdx: number,
    dRow: number,
    dCol: number,
  }
};

export const INITIAL: State = {
  width: 12,
  height: 24,
  board: (() => {
    const board: number[][] = [];
    for (let i = 0; i < 24; i++) {
      board.push(Array(12).fill(0));
    }
    return board;
  })(),
  activeShape: { shapeIdx: 10, dRow: 0, dCol: 0 },
};

function doTranslate(s: State, a: Translate): State {
  return produce(s, s => {
    const [minRow, minCol, maxRow, maxCol] = shape.bbox(SHAPES[s.activeShape.shapeIdx]);
    if (minRow + s.activeShape.dRow + a.dRow < 0) {
      return s;
    }
    if (maxRow + s.activeShape.dRow + a.dRow >= s.height) {
      return s;
    }
    if (minCol + s.activeShape.dCol + a.dCol < 0) {
      return s;
    }
    if (maxCol + s.activeShape.dCol + a.dCol >= s.width) {
      return s;
    }

    s.activeShape.dRow += a.dRow;
    s.activeShape.dCol += a.dCol;

    return s;
  });
}

export function apply(s: State, a: Action): State {
  switch (a.kind) {
    case 'tick':
      return s;
    case 'translate':
      return doTranslate(s, a);
  }
}
