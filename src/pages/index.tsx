import Prando from 'prando';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';

import * as actions from '../actions';
import App from '../App';
import * as gs from '../game/state';
import * as input from '../input';
import * as randomizer from '../game/randomizer';
import * as ui from '../ui';

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

export default function index() {
  const manualActions = new rx.Subject<actions.Action>();
  const ticks = rx.timer(0, 1000 / 60).pipe(
    rxop.map((_): actions.Action => ({ kind: 'tick' }))
  )

  const keyDowns =
    rx.fromEvent(document, "keydown") as rx.Observable<KeyboardEvent>;
  const keyUps =
    rx.fromEvent(document, "keyup") as rx.Observable<KeyboardEvent>;

  const rawInputs: rx.Observable<input.RawInput> = rx.merge(keyUps, keyDowns).pipe(
    rxop.map(e => ({ button: keyToInput(e.key), pressed: e.type === 'keydown' } as input.RawInput)),
    rxop.filter(i => i.button != null),
  )

  const inputActions = input.parseInput(rawInputs).pipe(
    rxop.map((input): actions.Action => ({ kind: 'input', input }))
  );

  const allActions = rx.merge(manualActions, inputActions, ticks);

  const levelTable = Array.from({ length: 37 }, (_, idx): gs.LevelInfo => ({
    number: idx + 1,
    gravity: levelToGravity(idx),
    multiplier: gravityToLevel(levelToGravity(idx)) + 1
  }));

  const gameView = new gs.View(levelTable)
  const gameController = new gs.Controller(
    new randomizer.NBagRandomizer(new Prando(), 2),
    gameView);

  const uiController = new ui.Controller(gameView, gameController);
  const initial = uiController.initialState();

  const states = allActions.pipe(
    rxop.scan<actions.Action, ui.State>((s, a) => {
      switch (a.kind) {
        case "tick":
          return uiController.tick(s);
        case "input":
          return uiController.input(s, a.input);
        case "ui":
          return uiController.start(s);
      }
    }, initial),
    rxop.startWith(initial));

  const doms = states.pipe(rxop.map(s =>
    <App key="app"
      state = { s }
      view = { gameView }
      dispatch = { a => manualActions.next(a) } />));

  const root = document.getElementById('root') as HTMLElement;

  doms.subscribe((d) => ReactDOM.render(d, root));
}
