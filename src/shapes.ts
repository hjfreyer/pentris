
import * as shape from './shape';

// Pentominos.

const pentominoF: shape.Shape = [
  [0, 0],
  [1, 0],
  [0, 1],
  [0, 2],
  [-1, 1],
];

const pentominoI: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
];

const pentominoL: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 3],
];

const pentominoN: shape.Shape = [
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 2],
  [0, 3],
];

const pentominoP: shape.Shape = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
];

const pentominoT: shape.Shape = [
  [0, -1],
  [0, 1],
  [0, 0],
  [1, 0],
  [2, 0],
];

const pentominoU: shape.Shape = [
  [0, 0],
  [0, -1],
  [0, 1],
  [-1, 1],
  [-1, -1],
];

const pentominoV: shape.Shape = [
  [0, -2],
  [0, -1],
  [0, 0],
  [1, 0],
  [2, 0],
];

const pentominoW: shape.Shape = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
];

const pentominoX: shape.Shape = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const pentominoY: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [-1, 1],
];

const pentominoZ: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [-1, 0],
  [1, 2],
];

const pentominoF2: shape.Shape = shape.mirrored(pentominoF);

const pentominoJ: shape.Shape = shape.mirrored(pentominoL);

const pentominoN2: shape.Shape = shape.mirrored(pentominoN);

const pentominoQ: shape.Shape = shape.mirrored(pentominoP);

const pentominoY2: shape.Shape = shape.mirrored(pentominoY);

const pentominoS: shape.Shape = shape.mirrored(pentominoZ);

const PENTOMINOES: shape.Shape[] = [
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

const tetrominoI: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
];

const tetrominoJ: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 2],
];

const tetrominoL: shape.Shape = shape.mirrored(tetrominoJ);

const tetrominoO: shape.Shape = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const tetrominoS: shape.Shape = [
  [1, 0],
  [1, 1],
  [0, 1],
  [0, 2],
];

const tetrominoZ: shape.Shape = shape.mirrored(tetrominoS);

const tetrominoT: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 1],
];

const TETROMINOES: shape.Shape[] = [
  tetrominoI,
  tetrominoJ,
  tetrominoL,
  tetrominoO,
  tetrominoS,
  tetrominoZ,
  tetrominoT,
];

// Trominoes

const trominoI: shape.Shape = [
  [0, 0],
  [0, 1],
  [0, 2],
];

const trominoL: shape.Shape = [
  [0, 0],
  [0, 1],
  [1, 1],
];

const TROMINOES: shape.Shape[] = [
  trominoI,
  trominoL,
];

const domino: shape.Shape = [
  [0, 0],
  [0, 1],
];

const monomino: shape.Shape = [
  [0, 0]
];

const SHAPES: shape.Shape[] = [
  monomino,
  domino,
  ...TROMINOES,
  ...TETROMINOES,
  ...PENTOMINOES
].map(shape.centered);

export default SHAPES;
