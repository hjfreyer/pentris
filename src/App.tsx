import * as React from 'react';
//import * as rx from 'rxjs';
import './App.css';
import Board from './Board';
import * as state from './state';
//import SHAPES from './shapes';
export type Input = {};

export type Properties = {
  state: state.State
}

function renderBoard(s: state.State): number[][] {
  const res = s.board.map(row => row.slice());

  const shape = state.getShape(s.activeShape);

  for (const [row, col] of shape) {
    res[row][col] = s.activeShape.shapeIdx + 1;
  }

  return res;
}

function App({ state }: Properties): JSX.Element {
  return (<div className= "App">
    <Board cells={ renderBoard(state) } />
    <aside>
      <h1>Pentris</h1>
      It's Delicious. It's Pentris.
    </aside>
  </div>);
}

export default App;
