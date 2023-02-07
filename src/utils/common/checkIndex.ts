export function isSameIndex(index: number, target: number): boolean {
  return index === target;
}

export function isNotSameIndex(index: number, target: number): boolean {
  return index !== target;
}

export function isHoveredNothing(hoveredIndex: number) {
  return hoveredIndex === -1;
}

export function isClickedNothing(clickedIndex: number) {
  return clickedIndex === -1;
}
