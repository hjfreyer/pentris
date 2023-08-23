import * as React from "react";
import ReactDOM from "react-dom/client";
import * as rx from "rxjs";
import * as rxop from "rxjs/operators";

import App from "../views/App";
import * as input from "../ui/input";
import * as factory from "../game/factory";
import * as ui from "../ui/state";

const LOCAL_STORAGE_PREFS_KEY = "prefs";

function keyToInput(key: KeyboardEvent): input.RawInput | null {
  const pressed = key.type === "keydown";
  switch (key.key) {
    case "ArrowLeft":
      return { button: "LEFT", pressed };
    case "ArrowRight":
      return { button: "RIGHT", pressed };
    case "ArrowDown":
      return { button: "DOWN", pressed };
    case "ArrowUp":
      return { button: "SPIN", pressed };
    case "Shift":
      return { button: "COUNTER_SPIN", pressed };
    case " ":
      return { button: "DROP", pressed };
    case "p":
    case "P":
      return { button: "PAUSE", pressed };
    default:
      return null;
  }
}

function saveLocalStorage(s: ui.State, a: ui.Action) {
  if (a.kind !== "update-prefs") {
    return;
  }
  localStorage[LOCAL_STORAGE_PREFS_KEY] = JSON.stringify(s.prefs);
}

export default function index(root: ReactDOM.Root) {
  const manualActions = new rx.Subject<ui.Action>();
  const ticks = rx
    .timer(0, 1000 / 60)
    .pipe(rxop.map((_): ui.Action => ({ kind: "tick" })));

  const keyDowns = rx.fromEvent(
    document,
    "keydown",
  ) as rx.Observable<KeyboardEvent>;
  const keyUps = rx.fromEvent(
    document,
    "keyup",
  ) as rx.Observable<KeyboardEvent>;

  const rawInputs: rx.Observable<input.RawInput> = rx
    .merge(keyUps, keyDowns)
    .pipe(
      rxop.map((e: KeyboardEvent) => keyToInput(e)),
      rxop.filter((i) => i != null),
      rxop.map((r: input.RawInput | null) => r!),
    );

  const inputActions = input
    .parseInput(rawInputs)
    .pipe(rxop.map((input): ui.Action => ({ kind: "input", input })));

  const allActions = rx.merge(manualActions, inputActions, ticks);

  const gameController = factory.newProdController();

  const uiController = new ui.Controller(gameController);

  let preferences: ui.Preferences = {
    startingSpeed: 1,
    zeroG: false,
  };
  if (LOCAL_STORAGE_PREFS_KEY in localStorage) {
    preferences = JSON.parse(localStorage[LOCAL_STORAGE_PREFS_KEY]);
  }

  const initial = uiController.initialState(preferences);

  const states = allActions.pipe(
    rxop.scan<ui.Action, ui.State>((s, a) => {
      const after = uiController.apply(s, a);
      saveLocalStorage(after, a);
      return after;
    }, initial),
    rxop.startWith(initial),
  );

  const doms = states.pipe(
    rxop.map((s) => (
      <App
        key="app"
        state={s}
        view={gameController.view()}
        dispatch={(a) => manualActions.next(a)}
      />
    )),
  );

  doms.subscribe((d) => root.render(d));
}
