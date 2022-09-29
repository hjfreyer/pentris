import * as React from 'react';

import Board from './Board';
import * as gs from '../game/state';
import PiecePreview from './PiecePreview';
import Footer from './Footer';

import './InGame.css';

export type InGameProps = {
    game: gs.State
    view: gs.View
    startGame: () => void
    paused: boolean
};

export default function InGame({ game, view, startGame, paused }: InGameProps): JSX.Element {
    return <div className="in-game container">
        <main>
            <Board cells={gs.flattenBoard(game)} />
        </main>
        <aside>
            <h1>Pentris</h1>
            <p className="copy">
                Like Tetris, but more so.
            </p>
            <h2>Preview</h2>
            <PiecePreview shapeIdx={game.nextShapeIdx} />
            <div className="stats">
                <p className="stat score">{game.score}</p>
                <p className="stat lines">{game.lines}</p>
                <p className="stat level">{view.getLevel(game) + 1}</p>
                <p className="stat speed">{view.getMultiplier(game)}</p>
            </div>
            <div className="controls">
                <li><b>Up</b>: Rotate</li>
                <li><b>Space</b>: Drop</li>
                <li><b>P</b>: Pause</li>
                </div>
            <Footer />
        </aside>
        <div className="modal" hidden={!game.toppedOut}>
            <div className="card">
                <h1>OWNED!</h1>
                <p>Score: {game.score}</p>
                <button className="btn btn-primary"
                    onClick={startGame}>
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
    </div>;
}