import * as React from "react";

import * as gs from "../game/state";

import "./Board.css";

export type State = {
  cells: gs.GridCell[][];
};

function cellClassName(c: gs.GridCell): string {
  switch (c.kind) {
    case "empty":
      return "cell empty";
    case "shape":
      return `cell color-${c.shapeIdx}`;
  }
}

function Board(state: State): JSX.Element {
  return (
    <div className="Board">
      {state.cells.map((row, rowIdx) => (
        <div className="row" key={rowIdx}>
          {row.map((cell, cellIdx) => (
            <div className={cellClassName(cell)} key={cellIdx} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
