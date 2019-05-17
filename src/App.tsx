import * as React from 'react';
import './App.css';
import Board from './Board';
import PiecePreview from './PiecePreview';
import * as state from './state';

export type Properties = {
  state: state.State
}

function App(p: Properties): JSX.Element {
  const s = p.state;
  return (<div className= "App">
    <Board cells={ state.flattenBoard(s) } />
    <aside>
      <h1>Pentris</h1>
      <p>
        It's Alpha. It's Delicious. It's Pentris.
      </p>
      <h2>Preview</h2>
      <PiecePreview shapeIdx={p.state.nextShapeIdx}/>
      <h2>Score</h2>
      <p className="score">{s.score}</p>
      <h2>Lines Cleared</h2>
      <p className="score">{s.lines}</p>
    </aside>
  </div>);
}

export default App;
