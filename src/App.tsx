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

function App(p: Properties): JSX.Element {
  return (<div className= "App">
    <Board cells={ state.flattenBoard(p.state) } />
    <aside>
      <h1>Pentris</h1>
      It's Delicious. It's Pentris.
    </aside>
  </div>);
}

export default App;
