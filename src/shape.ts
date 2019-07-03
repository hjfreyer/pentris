
export type Shape = Array<[number, number]>;

export function mirrored(s: Shape): Shape {
  return s.map(([row, col]) => [row, -col]);
}

export function transpose(s: Shape): Shape {
  return s.map(([row, col]) => [col, row]);
}

export function bbox(s: Shape): [number, number, number, number] {
  const rows = s.map(([row, _]) => row);
  const cols = s.map(([_, col]) => col);
  return [Math.min(...rows), Math.min(...cols),
  Math.max(...rows), Math.max(...cols)];
}

export function introOffsets(s: Shape, width: number): [number, number] {
  const [, minCol, maxRow, maxCol] = bbox(s);
  const dRow = -maxRow;
  const dCol = Math.floor((width - maxCol + minCol) / 2) - minCol;
  return [dRow, dCol];
}

export function justified(s: Shape): [Shape, number, number] {
  const [minRow, minCol, maxRow, maxCol] = bbox(s);
  return [
    s.map(([row, col]) => [row - minRow, col - minCol]),
    maxRow - minRow + 1,
    maxCol - minCol + 1,
  ];
}

function center(s: Shape): [number, number] {
  const [minRow, minCol, maxRow, maxCol] = bbox(s);

  // The side length of a square surrounding the shape. Assumes shapes are
  // always oriented horizontally.
  const squareSide = maxCol - minCol;
  const rowOffsetIntoSquare = Math.ceil((squareSide - (maxRow - minRow)) / 2);
  const squareMinRow = minRow - rowOffsetIntoSquare;
  const centerRow = squareMinRow + squareSide / 2;
  const centerCol = minCol + squareSide / 2;

  return [centerRow, centerCol];
}

export function rotate(s: Shape, count: number) {
  const [centerRow, centerCol] = center(s);

  let res = s.map(([r, c]) => ([r - centerRow, c - centerCol])) as Shape;
  for (let i = 0; i < count; i++) {
    res = (res.map(([row, col]) => [col, -row]) as Shape);
  }
  return res.map(([r, c]) => ([r + centerRow, c + centerCol])) as Shape;
}
