import * as React from "react";

import * as ui from "../ui/state";

import "./NewGame.css";
import Logo from "./Logo";
import Footer from "./Footer";

export type NewGameProps = {
  prefs: ui.Preferences;
  setPrefs: (p: ui.Preferences) => void;
  startGame: () => void;
};

export default function NewGame({
  prefs,
  setPrefs,
  startGame,
}: NewGameProps): JSX.Element {
  const updateStartingSpeed = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrefs({
      ...prefs,
      startingSpeed: e.target.valueAsNumber,
    });

  const updateZeroG = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPrefs({
      ...prefs,
      zeroG: e.target.checked,
    });

  return (
    <div className="new-game container">
      <Logo />

      <div className="settings">
        <div className="form-row">
          <label>Starting Speed</label>
          <input
            type="range"
            min="1"
            max="30"
            value={prefs.startingSpeed}
            onChange={updateStartingSpeed}
          />
          <input
            className="level-text"
            type="number"
            min="1"
            max="30"
            value={prefs.startingSpeed}
            onChange={updateStartingSpeed}
          />
        </div>
        <div className="form-row">
          <label htmlFor="zero-g-checkbox">Zero-G</label>
          <input
            id="zero-g-checkbox"
            type="checkbox"
            checked={prefs.zeroG}
            onChange={updateZeroG}
          />
        </div>
      </div>

      <button className="btn btn-primary" autoFocus onClick={startGame}>
        New Game
      </button>
      <Footer />
      <div className="v2-notice">
        Looking for <a href="https://v2.pentris.net">Version 2</a>?
      </div>
    </div>
  );
}
