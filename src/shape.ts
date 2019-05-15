
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

export function center(s: Shape): [number, number] {
  const [minRow, minCol, maxRow, maxCol] = bbox(s);
  return [Math.floor((minRow + maxRow) / 2), Math.floor((minCol + maxCol) / 2)]
}

export function centered(s: Shape): Shape {
  const [cRow, cCol] = center(s);
  return s.map(([row, col]) => [row - cRow, col - cCol]);
}

export function justified(s: Shape): [Shape, number, number] {
  const [minRow, minCol, maxRow, maxCol] = bbox(s);
  return [
    s.map(([row, col]) => [row - minRow, col - minCol]),
    maxRow - minRow + 1,
    maxCol - minCol + 1,
  ];
}
