import * as React from "react";

import * as gs from "../game/state";
import * as shape from "../game/shape";
import Board from "./Board";
import "./Logo.css";

function Logo(): JSX.Element {
  const shapeP: shape.Shape = { idx: 18, col: 0, row: 0, rot: 1 };
  const shapeE: shape.Shape = { idx: 7, col: 0, row: 0, rot: 0 };
  const shapeN: shape.Shape = { idx: 24, col: 0, row: 0, rot: 2 };
  const shapeT: shape.Shape = { idx: 27, col: 0, row: 0, rot: 0 };
  const shapeR: shape.Shape = { idx: 3, col: 0, row: 0, rot: 3 };
  const shapeI: shape.Shape = { idx: 1, col: 0, row: 0, rot: 1 };
  const shapeS: shape.Shape = { idx: 8, col: 0, row: 0, rot: 0 };

  const word = [shapeP, shapeE, shapeN, shapeT, shapeR, shapeI, shapeS];

  return (
    <div className="Logo">
      {word.map((shp, i) => {
        const [justified, rows, cols] = shape.justify(shape.getTiles(shp));
        const grid = Array.from({ length: rows }, () =>
          Array(cols).fill({ kind: "empty" } as gs.GridCell),
        );

        for (const [row, col] of justified) {
          grid[row][col] = { kind: "shape", shapeIdx: shp.idx };
        }
        return <Board key={i} cells={grid} />;
      })}
    </div>
  );
}

export default Logo;
