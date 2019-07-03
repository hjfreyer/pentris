import * as React from 'react';

import * as ui from '../ui/state';
import Board from './Board';
import * as gs from '../game/state';
import PiecePreview from './PiecePreview';

import './App.css';

export type Properties = {
  state: ui.State
  view: gs.View
  dispatch: (a: ui.Action) => void
}

function App({state, view, dispatch}: Properties): JSX.Element {
  switch (state.kind) {
  case 'new_game':
    return (
      <div className= "App">
        <div className="new-game">
          <h1>Pentris!</h1>
          <p>v3beta: Now with Levels!!</p>


          <button className="btn btn-primary" autoFocus onClick={()=> dispatch({kind: 'ui', action: 'START'})}>
            New Game
          </button>
        </div>
      </div>
    )
  case 'in_game':
    const s = state.game;
    return (<div className= "App">
      <main>
        <Board cells={ gs.flattenBoard(s) } />
      </main>
      <aside>
        <h1>Pentris</h1>
        <p className="copy">
          It's Beta.<br/>It's Delicious.<br/>It's Pentris.
        </p>
        <h2>Preview</h2>
        <PiecePreview shapeIdx={s.nextShapeIdx}/>
        <h3>Score</h3>
        <h3>Lines Cleared</h3>
        <p className="score">{s.score}</p>
        <p className="score">{s.lines}</p>
        <h3>Level</h3>
        <h3>Speed</h3>
        <p className="score">{view.getLevelInfo(s).number}</p>
        <p className="score">{view.getLevelInfo(s).multiplier}</p>
      </aside>
      <div className="game-over" hidden={!s.toppedOut}>
        <div className="card">
          <h1>OWNED!</h1>
          <p>Score: {s.score}</p>
          <button className="btn btn-primary"
            onClick={()=> dispatch({kind: 'ui', action: 'START'})}>
            New Game
          </button>
        </div>
      </div>
    </div>);
  }
}

export default App;
