export function checkIsSameIndex(index: number, target: number): boolean {
  return index === target;
}

export function checkIsNotSameIndex(index: number, target: number): boolean {
  return index !== target;
}

export function checkIsHoveredNothing(hoveredIndex: number) {
  return hoveredIndex === -1;
}

export function checkIsClickedNothing(clickedIndex: number) {
  return clickedIndex === -1;
}
