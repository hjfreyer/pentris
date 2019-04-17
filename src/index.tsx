import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';
import App from './App';
import * as state from './state';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const manualActions = new rx.Subject<state.Action>();
const ticks = rx.timer(0, 1000 / 60).pipe(
  rxop.map(_ => ({ kind: 'tick' } as state.Action))
)

const keyDowns =
  rx.fromEvent(document, "keydown") as rx.Observable<KeyboardEvent>;
const keyUps =
  rx.fromEvent(document, "keyup") as rx.Observable<KeyboardEvent>;

function keyToInput(key: string): state.InputType | null {
  switch (key) {
    case 'ArrowLeft':
      return 'LEFT';
    case 'ArrowRight':
      return 'RIGHT';
    case 'ArrowDown':
      return 'DOWN';
    default:
      return null;
  }
}

const keyPresses = rx.merge(keyUps, keyDowns).pipe(
  // Ignore repeated keydowns unless separated by a keyup.
  rxop.groupBy(e => e.key),
  rxop.map(group => group.pipe(rxop.distinctUntilKeyChanged('type'))),
  rxop.mergeAll(),

  // Convert to a single stream of keys.
  rxop.scan<KeyboardEvent, state.InputType>((acc, val) => {
    const input = keyToInput(val.key);

    // Unrecognized keys do nothing.
    if (input == null) { return acc; }

    // If we released a key...
    if (val.type == 'keyup') {
      // Cancel the input if it's the active key. Otherwise, ignore.
      return input == acc ? 'NONE' : acc;
    }
    if (val.type != 'keydown') {
      throw 'Unexpected key event';
    }
    return input;
  }, 'NONE'),
  rxop.distinctUntilChanged(),
);

keyPresses.subscribe(console.log);

const inputActions = keyPresses.pipe(
  rxop.map(input => ({ kind: 'input', input } as state.Action))
);

const actions = rx.merge(manualActions, inputActions, ticks);

const states = actions.pipe(rxop.scan<state.Action, state.State>(state.apply, state.INITIAL), rxop.startWith(state.INITIAL));

const doms = states.pipe(rxop.map(s => <App key="app" state={s} />));

const root = document.getElementById('root') as HTMLElement;

//const dom = App(inputs);

doms.subscribe((d) => ReactDOM.render(d, root));


import SHAPES from './shapes';
window['SHAPES'] = SHAPES;
window['DISPATCH'] = (a: state.Action) => manualActions.next(a);
registerServiceWorker();
