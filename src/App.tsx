import * as React from 'react';
import './App.css';
import Board from './Board';
import PiecePreview from './PiecePreview';
import * as state from './state';

export type Properties = {
  state: state.State
  integ: state.Integrator
}

function App(p: Properties): JSX.Element {
  const s = p.state;
  return (<div className= "App">
    <main>
      <Board cells={ state.flattenBoard(s) } />
    </main>
    <aside>
      <h1>Pentris</h1>
      <p className="copy">
        It's Alpha. It's Delicious. It's Pentris.
      </p>
      <h2>Preview</h2>
      <PiecePreview shapeIdx={p.state.nextShapeIdx}/>
      <h3>Score</h3>
      <h3>Lines Cleared</h3>
      <p className="score">{s.score}</p>
      <p className="score">{s.lines}</p>
      <h3>Level</h3>
      <h3>Speed</h3>
      <p className="score">{p.integ.getLevelInfo(s).number}</p>
      <p className="score">{p.integ.getLevelInfo(s).multiplier}</p>
    </aside>
  </div>);
}

export default App;
