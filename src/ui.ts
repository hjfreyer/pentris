
import produce from 'immer';

import * as game from './game';
import * as input from './input';

type NewGameState = {
  kind: "new_game"
}

type InGameState = {
  kind: "in_game"
  game: game.State
}

export type State = NewGameState | InGameState;

export type Action = Tick | Input | UIAction;

type UIAction = {
  kind: 'ui'
  action: 'START'
}
type Tick = { kind: 'tick' };
type Input = {
  kind: 'input'
  input: input.ControllerInput
}

export class Controller {
  gameView: game.View
  gameController: game.Controller

  constructor(gameView: game.View, gameController: game.Controller) {
    this.gameView = gameView;
    this.gameController = gameController;
  }

  initialState(): State {
    return { kind: "new_game" };
  }

  start(_: State): State {
    return {
      kind: 'in_game',
      game: this.gameController.newState(),
    }
  }

  tick(s: State): State {
    return produce(s, (s: State) => {
      if (s.kind !== 'in_game') { return; }
      s.game = this.gameController.tick(s.game);
    });
  }

  input(s: State, i: input.ControllerInput): State {
    return produce(s, (s: State) => {
      if (s.kind !== 'in_game') { return; }
      s.game = this.gameController.input(s.game, i);
    });
  }
}
