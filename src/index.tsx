import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';
import App from './App';
import * as state from './state';
import * as input from './input';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Prando from 'prando';

const manualActions = new rx.Subject<state.Action>();
const ticks = rx.timer(0, 1000 / 60).pipe(
  rxop.map(_ => ({ kind: 'tick' } as state.Action))
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

const rawInputs: rx.Observable<input.RawInput> = rx.merge(keyUps, keyDowns).pipe(
  rxop.map(e => ({ button: keyToInput(e.key), pressed: e.type === 'keydown' } as input.RawInput)),
  rxop.filter(i => i.button != null),
)

const inputActions = input.parseInput(rawInputs).pipe(
  rxop.map(input => ({ kind: 'input', input } as state.Action)),
);

const actions = rx.merge(manualActions, inputActions, ticks);

const integ = new state.Integrator(new Prando());
const initial = integ.newState();

const states = actions.pipe(
  rxop.scan<state.Action, state.State>((s, a) => integ.apply(s, a), initial),
  rxop.startWith(initial));

const doms = states.pipe(rxop.map(s => <App key="app" state = { s } />));

const root = document.getElementById('root') as HTMLElement;

doms.subscribe((d) => ReactDOM.render(d, root));

registerServiceWorker();
