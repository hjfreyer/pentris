import * as React from 'react';

import * as ui from '../ui/state';
import * as gs from '../game/state';

import NewGame from './NewGame';
import InGame from './InGame';

import './App.css';

export type Properties = {
  state: ui.State
  view: gs.View
  dispatch: (a: ui.Action) => void
}

function App({ state, view, dispatch }: Properties): JSX.Element {
  const setPrefs = (
    (prefs: ui.Preferences) => dispatch({
      kind: 'update-prefs',
      update: (p: ui.Preferences) => ({
        ...p,
        ...prefs,
      })
    }));

  const startGame = () => dispatch({ kind: 'ui', action: 'START' });

  switch (state.kind) {
    case 'new_game':
      return (
        <div className="App">
          <NewGame
            prefs={state.prefs}
            setPrefs={setPrefs}
            startGame={startGame}
          />
        </div>
      );

    case 'in_game':
    case 'paused':
      return (
        <div className="App">
          <InGame game={state.game} view={view} startGame={startGame} paused={state.kind === 'paused'} />
        </div>
      );
  }
}

export default App;
