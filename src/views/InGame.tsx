import * as React from 'react';

import Board from './Board';
import * as gs from '../game/state';
import PiecePreview from './PiecePreview';

import './App.css';

export type InGameProps = {
    game: gs.State
    view: gs.View
    startGame: () => void
    paused: boolean
};

export default function InGame({ game, view, startGame, paused }: InGameProps): JSX.Element {
    return <div className="App">
        <main>
            <Board cells={gs.flattenBoard(game)} />
        </main>
        <aside>
            <h1>Pentris</h1>
            <p className="copy">
                It's Beta.<br />It's Delicious.<br />It's Pentris.
            </p>
            <h2>Preview</h2>
            <PiecePreview shapeIdx={game.nextShapeIdx} />
            <h3>Score</h3>
            <h3>Lines Cleared</h3>
            <p className="score">{game.score}</p>
            <p className="score">{game.lines}</p>
            <h3>Level</h3>
            <h3>Speed</h3>
            <p className="score">{view.getLevel(game) + 1}</p>
            <p className="score">{view.getMultiplier(game)}</p>
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