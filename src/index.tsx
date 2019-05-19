import Prando from 'prando';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';

import App from './App';
import * as game from './game';
import * as input from './input';
import * as randomizer from './randomizer';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const manualActions = new rx.Subject<Action>();
const ticks = rx.timer(0, 1000 / 60).pipe(
  rxop.map((_):Action =>  ({ kind: 'tick' }))
)

const keyDowns =
  rx.fromEvent(document, "keydown") as rx.Observable<KeyboardEvent>;
const keyUps =
  rx.fromEvent(document, "keyup") as rx.Observable<KeyboardEvent>;

function keyToInput(key: string): input.Button | null {
  switch (key) {
    case 'ArrowLeft':
      return 'LEFT';
    case 'ArrowRight':
      return 'RIGHT';
    case 'ArrowDown':
      return 'DOWN';
    case 'ArrowUp':
      return 'SPIN';
    case ' ':
      return 'DROP';
    default:
      return null;
  }
}

function levelToGravity(l: number): number {
  return Math.floor(48 * Math.pow(0.9, l));
}

function gravityToLevel(g: number): number {
  // Math.abs fixes a weird issue involving -0.
  return Math.abs(Math.floor(Math.log(g / 48) / Math.log(0.9)));
}

export type Action = Tick | Input;

type Tick = { kind: 'tick' };
type Input = {
  kind: 'input'
  input: input.ControllerInput
}

const rawInputs: rx.Observable<input.RawInput> = rx.merge(keyUps, keyDowns).pipe(
  rxop.map(e => ({ button: keyToInput(e.key), pressed: e.type === 'keydown' } as input.RawInput)),
  rxop.filter(i => i.button != null),
)

const inputActions = input.parseInput(rawInputs).pipe(
  rxop.map(input => ({ kind: 'input', input } as Action)),
);

const actions = rx.merge(manualActions, inputActions, ticks);

const levelTable = Array.from({ length: 37 }, (_, idx): game.LevelInfo => ({
  number: idx + 1,
  gravity: levelToGravity(idx),
  multiplier: gravityToLevel(levelToGravity(idx)) + 1
}));

const gameView = new game.View(levelTable)
const controller = new game.Controller(
  new randomizer.NBagRandomizer(new Prando(), 2),
  gameView);
const initial = controller.newState();

const states = actions.pipe(
  rxop.scan<Action, game.State>((s, a) => {
    switch (a.kind) {
    case "tick":
      return controller.tick(s);
    case "input":
      return controller.input(s, a.input)
    }
  }, initial),
  rxop.startWith(initial));

const doms = states.pipe(rxop.map(s =>
  <App key="app" state = { s } view = { gameView } />));

const root = document.getElementById('root') as HTMLElement;

doms.subscribe((d) => ReactDOM.render(d, root));

registerServiceWorker();
