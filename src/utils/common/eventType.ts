export function isEnterKey(e: React.KeyboardEvent): boolean {
  return e.key === "Enter";
}

export function isMouseEnter(e: React.MouseEvent): boolean {
  return e.type === "mouseenter";
}

export function isFocus(e: React.FocusEvent): boolean {
  return e.type === "focus";
}
