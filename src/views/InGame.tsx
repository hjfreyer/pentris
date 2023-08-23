import * as React from "react";

import Board from "./Board";
import * as gs from "../game/state";
import PiecePreview from "./PiecePreview";
import Footer from "./Footer";

import "./InGame.css";

export type InGameProps = {
  game: gs.State;
  view: gs.View;
  startGame: () => void;
  paused: boolean;
};

export default function InGame({
  game,
  view,
  startGame,
  paused,
}: InGameProps): JSX.Element {
  return (
    <div className="in-game container">
      <main>
        <Board cells={gs.flattenBoard(game)} />
      </main>
      <aside>
        <h1>Pentris</h1>
        <p className="copy">Like Tetris, but more so.</p>
        <h2>Preview</h2>
        <PiecePreview shapeIdx={game.nextShapeIdx} />
        <div className="stats">
          <p className="stat score">{game.score}</p>
          <p className="stat lines">{game.lines}</p>
          <p className="stat level">{view.getLevel(game) + 1}</p>
          <p className="stat speed">{view.getMultiplier(game)}</p>
        </div>
        <div className="controls">
          <span className="control">
            <span className="key material-icons">keyboard_arrow_up</span>
            <span className="key">SHIFT</span>
            <span className="action">Rotate</span>
          </span>
          <span className="control">
            <span className="key material-icons">keyboard_arrow_left</span>
            <span className="key material-icons">keyboard_arrow_down</span>
            <span className="key material-icons">keyboard_arrow_right</span>
            <span className="action">Move</span>
          </span>
          <span className="control">
            <span className="key">SPACE</span>
            <span className="action">Drop</span>
          </span>
          <span className="control">
            <span className="key">P</span>
            <span className="action">Pause</span>
          </span>
        </div>
        <Footer />
      </aside>
      <div className="modal" hidden={!game.toppedOut}>
        <div className="card gameover">
          <h1>OWNED!</h1>
          <div className="stats">
            <p className="stat score">{game.score}</p>
            <p className="stat lines">{game.lines}</p>
            <p className="stat level">{view.getLevel(game) + 1}</p>
          </div>
          <button className="btn btn-primary" onClick={startGame}>
            New Game
          </button>
        </div>
      </div>
      <div className="modal" hidden={!paused}>
        <div className="card">
          <h1>PAUSED</h1>
          <p>Press "P" to unpause</p>
        </div>
      </div>
    </div>
  );
}
