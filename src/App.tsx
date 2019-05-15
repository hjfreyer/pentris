import * as React from 'react';
import './App.css';
import Board from './Board';
import PiecePreview from './PiecePreview';
import * as state from './state';

export type Properties = {
  state: state.State
}

function App(p: Properties): JSX.Element {
  return (<div className= "App">
    <Board cells={ state.flattenBoard(p.state) } />
    <aside>
      <h1>Pentris</h1>
      <p>
        It's Delicious. It's Pentris.
      </p>
      <h2>Preview</h2>
      <PiecePreview shapeIdx={p.state.nextShapeIdx}/>
    </aside>
  </div>);
}

export default App;
