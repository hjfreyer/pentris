
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';
import * as input from './input';
import Prando from 'prando';

const DAS_INITIAL_DELAY = 16;
const DAS_REFRESH_DELAY = 6;
const ENTRY_DELAY = 18;

export type Action = Tick | Input;

type Tick = { kind: 'tick' };
type Input = {
  kind: 'input'
  input: input.ControllerInput
}

type ActiveShape = {
  shapeIdx: number
  dRow: number
  dCol: number
  rotation: 0 | 1 | 2 | 3
}

export type State = {
  width: number
  height: number
  activeShape: ActiveShape,

  dasDirection: input.DirectionValue
  dasDelay: number

  entryDelay: number
  dropDelay: number
  board: number[][]
};

export function newState(rand: Prando): State {
  return {
    width: 12,
    height: 24,
    activeShape: newActiveShape(rand),
    dasDirection: 'NONE',
    dasDelay: 0,
    entryDelay: ENTRY_DELAY,
    dropDelay: 60,
    board: makeGrid(12, 24),
  };
}

function makeGrid(width: number, height: number): number[][] {
  const board: number[][] = [];
  for (let i = 0; i < height; i++) {
    board.push(Array(width).fill(0));
  }
  return board;
}

export function getShape(s: ActiveShape): shape.Shape {
  let res = SHAPES[s.shapeIdx];
  for (let i = 0; i < s.rotation; i++) {
    res = (res.map(([row, col]) => [col, -row]) as shape.Shape);
  }
  res = (res.map(([row, col]) => [row + s.dRow, col + s.dCol]) as shape.Shape);
  return res.filter(([row, _]) => row >= 0);
}

function newActiveShape(rand: Prando): ActiveShape {
  return {
    shapeIdx: rand.nextInt(0, SHAPES.length - 1),
    dRow: 0,
    dCol: 6,
    rotation: 0,
  };
}

function activeShapeClips(s: State, a: ActiveShape): boolean {
  const shp = getShape(a);

  for (let [row, col] of shp) {
    const clips = (function() {
      if (s.height <= row || col < 0 || s.width <= col) {
        return true;
      }
      if (row < 0) {
        return false;
      }
      return s.board[row][col] !== 0;
    })();

    if (clips) {
      return true;
    }
  }
  return false;
}

function attemptMoveActive(s: State, dRow: number, dCol: number, dRot: number): boolean {
  const newActive: ActiveShape = {
    shapeIdx: s.activeShape.shapeIdx,
    dRow: s.activeShape.dRow + dRow,
    dCol: s.activeShape.dCol + dCol,
    rotation: (s.activeShape.rotation + dRot) % 4 as 0 | 1 | 2 | 3,
  }

  if (activeShapeClips(s, newActive)) {
    return false;
  }

  s.activeShape = newActive;
  return true;
}

function attemptTranslateDirection(s: State, d: input.DirectionButton | 'SPIN'): boolean {
  switch (d) {
    case 'LEFT':
      return attemptMoveActive(s, 0, -1, 0);
    case 'DOWN':
      return attemptMoveActive(s, 1, 0, 0);
    case 'RIGHT':
      return attemptMoveActive(s, 0, 1, 0);
    case 'SPIN':
      return attemptMoveActive(s, 0, 0, 1);
  }
}

function doEntry(s: State): boolean {
  if (0 < s.entryDelay) {
    s.entryDelay--;
    return false;
  }
  return true;
}

function doDAS(s: State) {
  if (s.dasDirection === 'NONE') {
    return;
  }
  if (s.dasDelay === 0) {
    s.dasDelay = DAS_REFRESH_DELAY;
    attemptTranslateDirection(s, s.dasDirection);
  } else {
    s.dasDelay--;
  }
}

function doDrop(rand: Prando, s: State) {
  if (s.dropDelay !== 0) {
    s.dropDelay--;
    return;
  }

  s.dropDelay = 60 / 3;
  if (attemptMoveActive(s, 1, 0, 0)) {
    return;
  }

  for (const [rowIdx, colIdx] of getShape(s.activeShape)) {
    s.board[rowIdx][colIdx] = s.activeShape.shapeIdx + 1;
  }

  s.entryDelay = ENTRY_DELAY;
  s.activeShape = newActiveShape(rand);
}

function doClears(s: State) {
  const fullRows: number[] = [];
  for (let row = 0; row < s.height; row++) {
    let allFull = (() => {
      for (let col = 0; col < s.width; col++) {
        if (s.board[row][col] === 0) {
          return false;
        }
      }
      return true;
    })();

    if (allFull) {
      fullRows.push(row);
    }
  }

  const newBoard = makeGrid(s.width, s.height);
  let src = s.height - 1;
  let dest = s.height - 1;
  while (src >= 0) {
    if (fullRows.includes(src)) {
      src--;
      continue;
    }

    for (let col = 0; col < s.width; col++) {
      newBoard[dest][col] = s.board[src][col];
    }
    src--;
    dest--;
  }
  s.board = newBoard;
}

function doTick(rand: Prando, s: State) {
  return produce(s, (s: State) => {
    if (!doEntry(s)) {
      return;
    }
    doDAS(s);
    doDrop(rand, s);
    doClears(s);
  });
}

function doInput(s: State, a: Input): State {
  return produce(s, s => {
    switch (a.input.direction) {
      case 'NONE':
        s.dasDirection = 'NONE';
        break;
      case 'LEFT':
      case 'RIGHT':
      case 'DOWN':
        if (s.dasDirection === 'NONE') {
          s.dasDelay = DAS_INITIAL_DELAY;
          attemptTranslateDirection(s, a.input.direction);
        }
        s.dasDirection = a.input.direction;
        break;
    }
    switch (a.input.action) {
      case 'NONE':
        break;
      case 'SPIN':
        attemptTranslateDirection(s, a.input.action);
        break;
    }
  });
}

export function apply(rand: Prando, s: State, a: Action): State {
  switch (a.kind) {
    case 'tick':
      return doTick(rand, s);
    case 'input':
      return doInput(s, a);
  }
}
