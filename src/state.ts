
import produce from 'immer';
import * as shape from './shape';
import SHAPES from './shapes';
import * as input from './input';
import * as randomizer from './randomizer';

const DAS_INITIAL_DELAY = 16;
const DAS_REFRESH_DELAY = 6;
const ENTRY_DELAY = 18;
const LINES_PER_LEVEL = 10;

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

export type LevelInfo = {
  number: number
  gravity: number
  multiplier: number
};

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
  lines: number
};

export class Integrator {
  rand: randomizer.Randomizer
  levelTable: LevelInfo[]

  constructor(rand: randomizer.Randomizer, levelTable: LevelInfo[]) {
    this.rand = rand;
    this.levelTable = levelTable;
  }

  newState(): State {
    return {
      width: 12,
      height: 24,
      nextShapeIdx: this.rand.nextShape(),
      activeShape: {
        shapeIdx: this.rand.nextShape(),
        dRow: 0,
        dCol: 6,
        rotation: 0,
      },
      dasDirection: 'NONE',
      dasDelay: 0,
      entryDelay: ENTRY_DELAY,
      gravity: this.levelTable[0].gravity,
      board: makeGrid(12, 24),
      score: 0,
      lines: 0,
    };
  }

  apply(s: State, a: Action): State {
    switch (a.kind) {
      case 'tick':
        return this.doTick(s);
      case 'input':
        return this.doInput(s, a);
    }
  }

  getLevelInfo(s: State): LevelInfo {
    const l = Math.floor(s.lines / LINES_PER_LEVEL);
    return this.levelTable[
      l < this.levelTable.length ? l : this.levelTable.length - 1];
  }

  private doEntry(s: State): boolean {
    if (0 < s.entryDelay) {
      s.entryDelay--;
      return false;
    }
    return true;
  }

  private doDAS(s: State) {
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

  private doGravity(s: State): boolean {
    if (s.gravity !== 0) {
      s.gravity--;
      return true;
    }

    s.gravity = this.getLevelInfo(s).gravity;
    return attemptMoveActive(s, 1, 0, 0);
  }

  private doTick(s: State) {
    return produce(s, (s: State) => {
      this.doDAS(s);
      if (!this.doEntry(s)) {
        return;
      }
      if (!this.doGravity(s)) {
        this.doLockDown(s);
      }
    });
  }

  private doInput(s: State, a: Input): State {
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
          this.doDrop(s);
          break;
      }
    });
  }

  private doDrop(s: State) {
    while (attemptMoveActive(s, 1, 0, 0)) { }
    this.doLockDown(s);
  }

  private doLockDown(s: State) {
    s.board = flattenBoard(s);
    s.entryDelay = ENTRY_DELAY;
    s.activeShape = {
      shapeIdx: s.nextShapeIdx,
      dRow: 0,
      dCol: s.width / 2,
      rotation: 0,
    };
    s.nextShapeIdx = this.rand.nextShape();

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
    s.score += (this.getLevelInfo(s).multiplier *
      (Math.pow(2, fullRows.length) - 1));
    s.lines += fullRows.length;
  }
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
