export function isClickedOutside(e: MouseEvent, refTarget: any, openModal: boolean) {
  return openModal && refTarget.current === e.target;
}
