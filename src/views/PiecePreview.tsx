import * as React from "react";

import * as gs from "../game/state";
import * as shape from "../game/shape";
import Board from "./Board";

export type Properties = {
  shapeIdx: number;
};

function PiecePreview({ shapeIdx }: Properties): JSX.Element {
  const [justified, rows, cols] = shape.justifiedTiles(shapeIdx);
  const grid = Array.from({ length: rows }, () =>
    Array(cols).fill({ kind: "empty" } as gs.GridCell),
  );

  for (const [row, col] of justified) {
    grid[row][col] = { kind: "shape", shapeIdx };
  }
  return (
    <div className="PiecePreview">
      <Board cells={grid} />
    </div>
  );
}

export default PiecePreview;
