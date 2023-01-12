export function isClickedOutside(e: MouseEvent, refTarget: any) {
  return refTarget && !refTarget.current?.contain(e.target);
}
