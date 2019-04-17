import * as React from 'react';

import './Board.css';

export type State = {
  cells : number[][],
};

function Board(state : State): JSX.Element {
  return (
    <div className="Board">
      {state.cells.map(
        (row, rowIdx) => <div className="row" key={rowIdx}>
          {
            row.map((cell, cellIdx) =>
              <div className={`cell color-${cell}`} key={cellIdx}/>
            )
          }
        </div>
      )}
    </div>
  )
}

export default Board;
