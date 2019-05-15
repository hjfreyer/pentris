
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';
import * as input from './input';
import Prando from 'prando';

const DAS_INITIAL_DELAY = 16;
const DAS_REFRESH_DELAY = 6;
const ENTRY_DELAY = 18;
const GRAVITY = 60 / 3;

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
type EmptyCell = { kind: 'empty' };
type ShapeCell = {
  kind: 'shape'
  shapeIdx: number
}
export type GridCell = EmptyCell | ShapeCell;

export type State = {
  width: number
  height: number
  nextShapeIdx: number
  activeShape: ActiveShape

  dasDirection: input.DirectionValue
  dasDelay: number

  entryDelay: number
  gravity: number
  board: GridCell[][]

  score: number
};

export function newState(rand: Prando): State {
  return {
    width: 12,
    height: 24,
    nextShapeIdx: newActiveShapeIdx(rand),
    activeShape: {
      shapeIdx: newActiveShapeIdx(rand),
      dRow: 0,
      dCol: 6,
      rotation: 0,
    },
    dasDirection: 'NONE',
    dasDelay: 0,
    entryDelay: ENTRY_DELAY,
    gravity: GRAVITY,
    board: makeGrid(12, 24),
    score: 0,
  };
}

function makeGrid(width: number, height: number): GridCell[][] {
  const board: GridCell[][] = [];
  for (let i = 0; i < height; i++) {
    board.push(Array(width).fill({ kind: 'empty' }));
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

export function flattenBoard(s: State): GridCell[][] {
  const res = s.board.map(row => row.slice());

  const shape = getShape(s.activeShape);

  for (const [row, col] of shape) {
    res[row][col] = {
      kind: 'shape',
      shapeIdx: s.activeShape.shapeIdx,
    }
  }

  return res;
}

function newActiveShapeIdx(rand: Prando): number {
  return rand.nextInt(0, SHAPES.length - 1);
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
      return s.board[row][col].kind !== 'empty';
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

function doGravity(rand: Prando, s: State) {
  if (s.gravity !== 0) {
    s.gravity--;
    return;
  }

  s.gravity = GRAVITY;
  if (attemptMoveActive(s, 1, 0, 0)) {
    return;
  }

  s.board = flattenBoard(s);
  s.entryDelay = ENTRY_DELAY;
  s.activeShape = {
    shapeIdx: s.nextShapeIdx,
    dRow: 0,
    dCol: s.width / 2,
    rotation: 0,
  };
  s.nextShapeIdx = newActiveShapeIdx(rand);
}

function doClears(s: State) {
  const fullRows: number[] = [];
  for (let row = 0; row < s.height; row++) {
    let allFull = (() => {
      for (let col = 0; col < s.width; col++) {
        if (s.board[row][col].kind === 'empty') {
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
  s.score += Math.pow(2, fullRows.length) - 1;
}

function doTick(rand: Prando, s: State) {
  return produce(s, (s: State) => {
    if (!doEntry(s)) {
      return;
    }
    doDAS(s);
    doGravity(rand, s);
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
      case 'DROP':
        doDrop(s);
        break;
    }
  });
}

function doDrop(s: State) {
  while (attemptMoveActive(s, 1, 0, 0)) { }
}

export function apply(rand: Prando, s: State, a: Action): State {
  switch (a.kind) {
    case 'tick':
      return doTick(rand, s);
    case 'input':
      return doInput(s, a);
  }
}
