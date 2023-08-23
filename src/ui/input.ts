import * as rx from "rxjs";
import * as rxop from "rxjs/operators";

export type DirectionButton = "LEFT" | "RIGHT" | "DOWN";
export type ActionButton = "SPIN" | "COUNTER_SPIN" | "DROP" | "PAUSE";

export type Button = DirectionButton | ActionButton;
export type RawInput = {
  button: Button;
  pressed: boolean;
};

export type ControllerInput = {
  left: boolean;
  right: boolean;
  down: boolean;
  action: "NONE" | ActionButton;
};

export function parseInput(
  raw: rx.Observable<RawInput>,
): rx.Observable<ControllerInput> {
  // Filter out the OS's key repetitions. There's a "repeated" boolean on
  // the event, but it doesn't have universal support so we figure it out.
  const deduped: rx.Observable<RawInput> = raw.pipe(
    rxop.groupBy((i) => i.button),
    rxop.map((group) => group.pipe(rxop.distinctUntilKeyChanged("pressed"))),
    rxop.mergeAll(),
  );

  const [dir, action] = rxop.partition<RawInput>(
    (i) => i.button === "LEFT" || i.button === "RIGHT" || i.button === "DOWN",
  )(deduped);

  const init: ControllerInput = {
    left: false,
    right: false,
    down: false,
    action: "NONE",
  };

  const currentDir: rx.Observable<ControllerInput> = dir.pipe(
    rxop.scan<RawInput, ControllerInput>((acc, val) => {
      if (val.button === "DOWN") {
        return {
          ...acc,
          down: val.pressed,
        };
      }

      if (val.button === "LEFT") {
        if (val.pressed) {
          return {
            ...acc,
            left: true,
            right: false,
          };
        } else {
          return {
            ...acc,
            left: false,
          };
        }
      }

      if (val.button === "RIGHT") {
        if (val.pressed) {
          return {
            ...acc,
            left: false,
            right: true,
          };
        } else {
          return {
            ...acc,
            right: false,
          };
        }
      }
      return acc;
    }, init),
    rxop.startWith(init),
  );

  const currentAction: rx.Observable<ActionButton | "NONE"> = action.pipe(
    rxop.filter((i) => i.pressed),
    rxop.map((i) => i.button as ActionButton),
  );

  const currentDirInputs: rx.Observable<ControllerInput> = currentDir.pipe(
    rxop.map((direction) => ({ ...direction, action: "NONE" })),
  );

  const currentActionInputs: rx.Observable<ControllerInput> =
    currentAction.pipe(
      rxop.withLatestFrom(currentDir),
      rxop.map(([action, direction]) => ({ ...direction, action })),
    );

  return rx.merge(currentDirInputs, currentActionInputs);
}
