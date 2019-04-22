
import * as rx from 'rxjs';
import * as rxop from 'rxjs/operators';

export type DirectionButton = 'LEFT' | 'RIGHT' | 'DOWN'
export type ActionButton = 'SPIN'
export type Button = DirectionButton | ActionButton
export type RawInput = {
  button: Button
  pressed: boolean
}

export type CgitsontrollerInput = {
  direction: 'NONE' | DirectionButton
  actions: ActionButton[]
}

export function parseInput(raw: rx.Observable<RawInput>):
  rx.Observable<ControllerInput> {
  // Filter out the OS's key repetitions. There's a "repeated" boolean on
  // the event, but it doesn't have universal support so we figure it out.
  const deduped: rx.Observable<RawInput> = raw.pipe(
    rxop.groupBy(i => i.pressed),
    rxop.map(group => group.pipe(rxop.distinctUntilKeyChanged('pressed'))),
    rxop.mergeAll(),
  );

  const [dir, action] =
    rxop.partition<RawInput>(i => i.button === 'LEFT'
      || i.button == 'RIGHT'
      || i.button == 'DOWN')(deduped);
}
