import shapes from "./shape-data";

export const NUM_SHAPES = shapes.length;

export type Tiles = Array<[number, number]>;
export type Shape = {
  idx: number;
  row: number;
  col: number;
  rot: number;
};

export function getTiles(s: Shape): Tiles {
  let res = shapes[s.idx];
  res = rotate(res, s.rot);
  res = translate(res, s.row, s.col);
  return res;
}

export function introduceShape(idx: number, width: number): Shape {
  const [, minCol, maxRow, maxCol] = boundingBox(shapes[idx]);
  const row = -maxRow;
  const col = Math.floor((width - maxCol + minCol) / 2) - minCol;
  return { idx, row, col, rot: 0 };
}

export function justifiedTiles(idx: number): [Tiles, number, number] {
  return justify(shapes[idx]);
}

export function justify(t: Tiles): [Tiles, number, number] {
  const [minRow, minCol, maxRow, maxCol] = boundingBox(t);
  return [
    translate(t, -minRow, -minCol),
    maxRow - minRow + 1,
    maxCol - minCol + 1,
  ];
}

function translate(t: Tiles, dRow: number, dCol: number): Tiles {
  return t.map(([row, col]) => [row + dRow, col + dCol]);
}

function boundingBox(t: Tiles): [number, number, number, number] {
  const rows = t.map(([row, _]) => row);
  const cols = t.map(([_, col]) => col);
  return [
    Math.min(...rows),
    Math.min(...cols),
    Math.max(...rows),
    Math.max(...cols),
  ];
}

function center(t: Tiles): [number, number] {
  const [minRow, minCol, maxRow, maxCol] = boundingBox(t);

  // The side length of a square surrounding the shape. Assumes shapes are
  // always oriented horizontally.
  const squareSide = maxCol - minCol;
  const rowOffsetIntoSquare = Math.ceil((squareSide - (maxRow - minRow)) / 2);
  const squareMinRow = minRow - rowOffsetIntoSquare;
  const centerRow = squareMinRow + squareSide / 2;
  const centerCol = minCol + squareSide / 2;

  return [centerRow, centerCol];
}

function rotate(t: Tiles, count: number) {
  const [centerRow, centerCol] = center(t);

  let res = t;
  res = translate(res, -centerRow, -centerCol);
  for (let i = 0; i < count; i++) {
    res = res.map(([row, col]) => [col, -row]);
  }
  return translate(res, centerRow, centerCol);
}
