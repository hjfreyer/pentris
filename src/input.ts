
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';

export type DirectionButton = 'LEFT' | 'RIGHT' | 'DOWN'
export type DirectionValue = 'NONE' | DirectionButton
export type ActionButton = 'SPIN'
export type ActionValue = 'NONE' | ActionButton
export type Button = DirectionButton | ActionButton
export type RawInput = {
  button: Button
  pressed: boolean
}

export type ControllerInput = {
  direction: DirectionValue
  action: ActionValue
}

export function parseInput(raw: rx.Observable<RawInput>):
  rx.Observable<ControllerInput> {
  // Filter out the OS's key repetitions. There's a "repeated" boolean on
  // the event, but it doesn't have universal support so we figure it out.
  const deduped: rx.Observable<RawInput> = raw.pipe(
    rxop.groupBy(i => i.button),
    rxop.map(group => group.pipe(rxop.distinctUntilKeyChanged('pressed'))),
    rxop.mergeAll(),
  );

  const [dir, action] =
    rxop.partition<RawInput>(i =>
      i.button === 'LEFT'
      || i.button === 'RIGHT'
      || i.button === 'DOWN')(deduped);

  const currentDir: rx.Observable<DirectionValue> = dir.pipe(
    rxop.scan<RawInput, DirectionValue>((acc, val) => {
      const newButton = val.button as DirectionButton;
      if (val.pressed) {
        // Newly pressed buttons override.
        return newButton;
      } else if (acc === val.button) {
        // If we released the last key we pressed, change to 'NONE'.
        return 'NONE';
      } else {
        // Otherwise, ignore.
        return acc;
      }
    }, 'NONE'),
    rxop.startWith('NONE'),
  );

  const currentAction: rx.Observable<ActionValue> = action.pipe(
    rxop.filter(i => i.pressed),
    rxop.map(i => i.button as ActionButton),
  );

  const currentDirInputs: rx.Observable<ControllerInput> = currentDir.pipe(
    rxop.map(direction => ({ direction, action: 'NONE' })),
  );

  const currentActionInputs: rx.Observable<ControllerInput> = currentAction.pipe(
    rxop.withLatestFrom(currentDir),
    rxop.map(([action, direction]) => ({ direction, action })),
  );

  return rx.merge(currentDirInputs, currentActionInputs);
}
