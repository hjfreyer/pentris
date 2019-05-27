
import * as input from './input';

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
