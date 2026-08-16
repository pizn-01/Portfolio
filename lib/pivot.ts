/**
 * Bridge between the switch button and the transition overlay.
 *
 * The two can't be the same component. The button lives in each route's
 * header, so it unmounts the moment navigation starts — and an overlay
 * unmounted mid-animation takes the animation with it, which is why the
 * first version of this transition tore instead of playing through.
 *
 * The overlay is mounted once in the root layout and registers itself here;
 * the button just asks it to play. If for any reason no overlay is mounted,
 * the navigation still happens — the animation is never allowed to be the
 * thing that decides whether the site works.
 */

export type PivotRequest = {
  /** Direction of travel, which decides the sheet and line colours. */
  toOperator: boolean
  /** Performed while the sheet is opaque. */
  navigate: () => void
}

type PivotPlayer = (req: PivotRequest) => void

let player: PivotPlayer | null = null

export function registerPivot(fn: PivotPlayer | null) {
  player = fn
}

export function runPivot(req: PivotRequest) {
  if (player) player(req)
  else req.navigate()
}
