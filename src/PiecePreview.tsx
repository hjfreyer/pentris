import * as React from 'react';

import * as game from './game';
import * as shape from './shape';
import SHAPES from './shapes';
import Board from './Board';

export type Properties = {
  shapeIdx: number,
};

function PiecePreview({ shapeIdx }: Properties): JSX.Element {
  const [justified, rows, cols] = shape.justified(SHAPES[shapeIdx]);
  const grid = Array.from({ length: rows },
    () => Array(cols).fill({ kind: 'empty' } as game.GridCell));

  for (const [row, col] of justified) {
    grid[row][col] = { kind: 'shape', shapeIdx };
  }
  return (
    <div className="PiecePreview">
      <Board cells={ grid } />
    </div>
  );
}

export default PiecePreview;
