import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';

import App from '../views/App';
import * as input from '../ui/input';
import * as factory from '../game/factory';
import * as ui from '../ui/state';

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

export default function index() {
  const manualActions = new rx.Subject<ui.Action>();
  const ticks = rx.timer(0, 1000 / 60).pipe(
    rxop.map((_): ui.Action => ({ kind: 'tick' }))
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
    rxop.map((input): ui.Action => ({ kind: 'input', input }))
  );

  const allActions = rx.merge(manualActions, inputActions, ticks);

  const [gameView, gameController] = factory.newProdViewAndController();

  const uiController = new ui.Controller(gameView, gameController);
  const initial = uiController.initialState();

  const states = allActions.pipe(
    rxop.scan<ui.Action, ui.State>((s, a) => {
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
