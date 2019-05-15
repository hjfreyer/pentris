import * as React from 'react';

import * as state from './state';
import * as shape from './shape';
import SHAPES from './shapes';
import Board from './Board';

export type Properties = {
  shapeIdx: number,
};

function PiecePreview({ shapeIdx }: Properties): JSX.Element {
  const [justified, rows, cols] = shape.justified(SHAPES[shapeIdx]);
  const grid = Array.from({ length: rows },
    () => Array(cols).fill({ kind: 'empty' } as state.GridCell));

  for (const [row, col] of justified) {
    grid[row][col] = { kind: 'shape', shapeIdx };
  }
  return <Board cells={ grid } />;
}

export default PiecePreview;
