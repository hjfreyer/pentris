import * as React from 'react';
//import * as rx from 'rxjs';
import './App.css';
import Board from './Board';
import * as state from './state';
import SHAPES from './shapes';
export type Input = {};

export type Properties = {
  state: state.State
}

function renderBoard(state: state.State): number[][] {
  const res = state.board.map(row => row.slice());

  const shape = SHAPES[state.activeShape.shapeIdx];

  for (const [row, col] of shape) {
    res[row + state.activeShape.dRow][col + state.activeShape.dCol] =
      state.activeShape.shapeIdx + 1;
  }

  return res;
}

function App({ state }: Properties): JSX.Element {
  return <div className="App">
    <Board cells={renderBoard(state)} />
  </div>;
}

export default App;
