export function checkIsSameId(currentId: number, targetId: number): boolean {
  return currentId === targetId;
}

export function checkIsNotSameId(currentId: number, targetId: number): boolean {
  return currentId !== targetId;
}

export function checkIsHoveredNothing(hoveredId: number) {
  return hoveredId === -1;
}

export function checkIsClickedNothing(clickedId: number) {
  return clickedId === -1;
}
