type Tiles = Array<[number, number]>;

export function mirrorY(t: Tiles): Tiles {
  return t.map(([row, col]) => [row, -col]);
}

// Pentominos.

const pentominoF: Tiles = [
  [0, 0],
  [1, 0],
  [0, 1],
  [0, 2],
  [-1, 1],
];

const pentominoI: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

const pentominoL: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
];

const pentominoN: Tiles = [
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 2],
  [0, 3],
];

const pentominoP: Tiles = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

const pentominoT: Tiles = [
  [0, -1],
  [0, 1],
  [0, 0],
  [1, 0],
  [2, 0],
];

const pentominoU: Tiles = [
  [0, 0],
  [0, -1],
  [0, 1],
  [-1, 1],
  [-1, -1],
];

const pentominoV: Tiles = [
  [0, -2],
  [0, -1],
  [0, 0],
  [1, 0],
  [2, 0],
];

const pentominoW: Tiles = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

const pentominoX: Tiles = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const pentominoY: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [-1, 1],
];

const pentominoZ: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [-1, 0],
  [1, 2],
];

const pentominoF2: Tiles = mirrorY(pentominoF);

const pentominoJ: Tiles = mirrorY(pentominoL);

const pentominoN2: Tiles = mirrorY(pentominoN);

const pentominoQ: Tiles = mirrorY(pentominoP);

const pentominoY2: Tiles = mirrorY(pentominoY);

const pentominoS: Tiles = mirrorY(pentominoZ);

const PENTOMINOES: Tiles[] = [
  pentominoF,
  pentominoF2,
  pentominoL,
  pentominoJ,
  pentominoN,
  pentominoN2,
  pentominoP,
  pentominoQ,
  pentominoY,
  pentominoY2,
  pentominoZ,
  pentominoS,
  pentominoT,
  pentominoU,
  pentominoV,
  pentominoW,
  pentominoX,
  pentominoI,
];

// Tetrominos

const tetrominoI: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];

const tetrominoJ: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 2],
];

const tetrominoL: Tiles = mirrorY(tetrominoJ);

const tetrominoO: Tiles = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const tetrominoS: Tiles = [
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 2],
];

const tetrominoZ: Tiles = mirrorY(tetrominoS);

const tetrominoT: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 1],
];

const TETROMINOES: Tiles[] = [
  tetrominoI,
  tetrominoJ,
  tetrominoL,
  tetrominoO,
  tetrominoS,
  tetrominoZ,
  tetrominoT,
];

// Trominoes

const trominoI: Tiles = [
  [0, 0],
  [0, 1],
  [0, 2],
];

const trominoL: Tiles = [
  [0, 0],
  [0, 1],
  [1, 1],
];

const TROMINOES: Tiles[] = [trominoI, trominoL];

const domino: Tiles = [
  [0, 0],
  [0, 1],
];

const monomino: Tiles = [[0, 0]];

const shapes: Tiles[] = [
  monomino,
  domino,
  ...TROMINOES,
  ...TETROMINOES,
  ...PENTOMINOES,
];

export default shapes;
