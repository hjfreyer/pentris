import produce from "immer";

import * as randomizer from "./randomizer";
import * as shape from "./shape";

const DAS_INITIAL_DELAY = 16;
const DAS_REFRESH_DELAY = 6;
const ENTRY_DELAY = 18;
const LINES_PER_LEVEL = 10;
const SOFT_DROP_MULTIPLIER = 5;

export type ActionButton = "SPIN" | "COUNTER_SPIN" | "DROP";
export type ControllerInput = {
  left: boolean;
  right: boolean;
  down: boolean;
  action: "NONE" | ActionButton;
};

type EmptyCell = { kind: "empty" };
type ShapeCell = {
  kind: "shape";
  shapeIdx: number;
};
export type GridCell = EmptyCell | ShapeCell;

export type GravityState =
  | {
      kind: "enabled";
      countDown: number;
    }
  | {
      kind: "disabled";
    };

export type LevelInfo = {
  number: number;
  gravity: number;
  multiplier: number;
};

export type Parameters = {
  minLevel: number;
  zeroG: boolean;
};

export type State = {
  width: number;
  height: number;
  nextShapeIdx: number;
  activeShape: shape.Shape;

  dasDirection: "NONE" | "LEFT" | "RIGHT" | "DOWN";
  dasDelay: number;

  softDrop: boolean;

  entryDelay: number;
  gravity: GravityState;
  board: GridCell[][];

  score: number;
  lines: number;
  minLevel: number;
  toppedOut: boolean;
};

export class View {
  levelTable: LevelInfo[];

  constructor(levelTable: LevelInfo[]) {
    this.levelTable = levelTable;
  }

  getLevel(s: State): number {
    return Math.min(
      Math.floor(s.lines / LINES_PER_LEVEL),
      this.levelTable.length - 1,
    );
  }

  private getSpeed(s: State): number {
    return Math.min(
      Math.max(s.minLevel, this.getLevel(s)),
      this.levelTable.length - 1,
    );
  }

  getGravity(s: State): number {
    return this.levelTable[this.getSpeed(s)].gravity;
  }

  getMultiplier(s: State): number {
    return this.levelTable[this.getSpeed(s)].multiplier;
  }
}

export class Controller {
  rand: randomizer.Randomizer;
  levelTable: LevelInfo[];

  constructor(rand: randomizer.Randomizer, levelTable: LevelInfo[]) {
    this.rand = rand;
    this.levelTable = levelTable;
  }

  view(): View {
    return new View(this.levelTable);
  }

  newState(p: Parameters): State {
    const gravity: GravityState = p.zeroG
      ? { kind: "disabled" }
      : {
          kind: "enabled",
          countDown: this.levelTable[p.minLevel].gravity,
        };

    return {
      width: 12,
      height: 24,
      nextShapeIdx: this.rand.nextShape(),
      activeShape: shape.introduceShape(this.rand.nextShape(), 12),
      dasDirection: "NONE",
      dasDelay: 0,
      softDrop: false,
      entryDelay: ENTRY_DELAY,
      gravity,
      board: makeGrid(12, 24),
      score: 0,
      lines: 0,
      minLevel: p.minLevel,
      toppedOut: false,
    };
  }

  tick(s: State): State {
    if (s.toppedOut) {
      return s;
    }

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

  input(s: State, i: ControllerInput): State {
    if (s.toppedOut) {
      return s;
    }

    return produce(s, (s) => {
      if (i.left) {
        if (s.dasDirection === "NONE") {
          attemptMoveActive(s, 0, -1, 0);
          s.dasDelay = DAS_INITIAL_DELAY;
        }
        s.dasDirection = "LEFT";
      } else if (i.right) {
        if (s.dasDirection === "NONE") {
          attemptMoveActive(s, 0, 1, 0);
          s.dasDelay = DAS_INITIAL_DELAY;
        }
        s.dasDirection = "RIGHT";
      } else if (i.down) {
        if (s.dasDirection === "NONE") {
          attemptMoveActive(s, 1, 0, 0);
          s.dasDelay = DAS_INITIAL_DELAY;
        }
        s.dasDirection = "DOWN";
      } else {
        s.dasDirection = "NONE";
      }

      s.softDrop = i.down;

      switch (i.action) {
        case "NONE":
          break;
        case "SPIN":
          attemptMoveActive(s, 0, 0, 1);
          break;
        case "COUNTER_SPIN":
          attemptMoveActive(s, 0, 0, 3);
          break;
        case "DROP":
          this.doDrop(s);
          break;
      }
    });
  }

  private doEntry(s: State): boolean {
    if (0 < s.entryDelay) {
      s.entryDelay--;
      return false;
    }
    return true;
  }

  private doDAS(s: State) {
    if (s.dasDirection === "NONE") {
      return;
    }
    if (s.dasDelay === 0) {
      s.dasDelay = DAS_REFRESH_DELAY;
      switch (s.dasDirection) {
        case "LEFT":
          attemptMoveActive(s, 0, -1, 0);
          break;
        case "RIGHT":
          attemptMoveActive(s, 0, 1, 0);
          break;
        case "DOWN":
          attemptMoveActive(s, 1, 0, 0);
          break;
      }
    } else {
      s.dasDelay--;
    }
  }

  private doGravity(s: State): boolean {
    if (s.gravity.kind === "disabled") {
      return true;
    }

    if (0 < s.gravity.countDown) {
      s.gravity.countDown -= s.softDrop ? SOFT_DROP_MULTIPLIER : 1;
      return true;
    }

    s.gravity.countDown = this.view().getGravity(s);
    return attemptMoveActive(s, 1, 0, 0);
  }

  private doDrop(s: State) {
    while (attemptMoveActive(s, 1, 0, 0)) {}
    this.doLockDown(s);
  }

  private doLockDown(s: State) {
    s.board = flattenBoard(s);
    s.entryDelay = ENTRY_DELAY;
    s.activeShape = shape.introduceShape(s.nextShapeIdx, s.width);
    s.nextShapeIdx = this.rand.nextShape();

    const fullRows: number[] = [];
    for (let row = 0; row < s.height; row++) {
      let allFull = (() => {
        for (let col = 0; col < s.width; col++) {
          if (s.board[row][col].kind === "empty") {
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
    s.score +=
      this.view().getMultiplier(s) * (Math.pow(2, fullRows.length) - 1);
    s.lines += fullRows.length;
    s.toppedOut = shapeClips(s, s.activeShape);
  }
}

function makeGrid(width: number, height: number): GridCell[][] {
  const board: GridCell[][] = [];
  for (let i = 0; i < height; i++) {
    board.push(Array(width).fill({ kind: "empty" }));
  }
  return board;
}

export function flattenBoard(s: State): GridCell[][] {
  const res = s.board.map((row) => row.slice());

  for (const [row, col] of shape.getTiles(s.activeShape)) {
    if (row < 0) {
      continue;
    }
    res[row][col] = {
      kind: "shape",
      shapeIdx: s.activeShape.idx,
    };
  }

  return res;
}

function shapeClips(s: State, shp: shape.Shape): boolean {
  for (let [row, col] of shape.getTiles(shp)) {
    const clips = (function () {
      if (s.height <= row || col < 0 || s.width <= col) {
        return true;
      }
      if (row < 0) {
        return false;
      }
      return s.board[row][col].kind !== "empty";
    })();

    if (clips) {
      return true;
    }
  }
  return false;
}

function attemptMoveActive(
  s: State,
  dRow: number,
  dCol: number,
  dRot: number,
): boolean {
  const newActive: shape.Shape = {
    idx: s.activeShape.idx,
    row: s.activeShape.row + dRow,
    col: s.activeShape.col + dCol,
    rot: (s.activeShape.rot + dRot) % 4,
  };

  if (shapeClips(s, newActive)) {
    return false;
  }

  s.activeShape = newActive;
  return true;
}
