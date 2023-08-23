import produce from "immer";

import * as gs from "../game/state";
import * as input from "./input";

export type Preferences = {
  startingSpeed: number;
  zeroG: boolean;
};

type NewGameState = {
  kind: "new_game";
  prefs: Preferences;
};

type InGameState = {
  kind: "in_game";
  prefs: Preferences;
  game: gs.State;
};

type PausedState = {
  kind: "paused";
  prefs: Preferences;
  game: gs.State;
};

export type State = NewGameState | InGameState | PausedState;

export type Action = Tick | Input | UIAction | UpdatePrefs;

type UIAction = {
  kind: "ui";
  action: "START";
};
type Tick = { kind: "tick" };
type Input = {
  kind: "input";
  input: input.ControllerInput;
};
type UpdatePrefs = {
  kind: "update-prefs";
  update: (p: Preferences) => Preferences;
};

export class Controller {
  gameController: gs.Controller;

  constructor(gameController: gs.Controller) {
    this.gameController = gameController;
  }

  initialState(prefs?: Preferences): State {
    if (prefs === undefined) {
      prefs = {
        startingSpeed: 1,
        zeroG: false,
      };
    }
    return { kind: "new_game", prefs };
  }

  apply(s: State, a: Action): State {
    switch (a.kind) {
      case "tick":
        return this.tick(s);
      case "input":
        return this.input(s, a.input);
      case "ui":
        return this.start(s);
      case "update-prefs":
        return this.updatePrefs(s, a);
    }
  }

  private start(s: State): State {
    return {
      kind: "in_game",
      prefs: s.prefs,
      game: this.gameController.newState({
        minLevel: s.prefs.startingSpeed - 1,
        zeroG: s.prefs.zeroG,
      }),
    };
  }

  private tick(s: State): State {
    return produce(s, (s: State) => {
      if (s.kind !== "in_game") {
        return;
      }
      s.game = this.gameController.tick(s.game);
    });
  }

  private input(s: State, i: input.ControllerInput): State {
    if (i.action === "PAUSE") {
      switch (s.kind) {
        case "in_game":
          return {
            kind: "paused",
            prefs: s.prefs,
            game: s.game,
          };
        case "paused":
          return {
            kind: "in_game",
            prefs: s.prefs,
            game: s.game,
          };
        case "new_game":
          return s;
      }
    } else {
      if (s.kind !== "in_game") {
        return s;
      }
      return {
        ...s,
        game: this.gameController.input(s.game, { ...i, action: i.action }),
      };
    }
  }

  private updatePrefs(s: State, up: UpdatePrefs): State {
    return { ...s, prefs: up.update(s.prefs) };
  }
}
