import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';
import App from './App';
import * as state from './state';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const actions = new rx.Subject<state.Action>();

const states = actions.pipe(rxop.scan<state.Action, state.State>(state.apply, state.INITIAL), rxop.startWith(state.INITIAL));

const doms = states.pipe(rxop.map(s => <App key="app" state={s} />));

const root = document.getElementById('root') as HTMLElement;

//const dom = App(inputs);

doms.subscribe((d) => ReactDOM.render(d, root));

import SHAPES from './shapes';
window['SHAPES'] = SHAPES;
window['DISPATCH'] = (a: state.Action) => actions.next(a);
registerServiceWorker();
