import { DefaultTheme } from "styled-components";

const colors = {};

export type ColorsTypes = typeof colors;

interface Font {
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

function FONT({ weight, size, lineHeight, letterSpacing }: Font): string {
  return `
    font-family:notosans,
    font-size : ${size},
    font-weight : ${weight},
    line-height : ${lineHeight},
    letter-spacing : ${letterSpacing}
    `;
}

const fonts = {};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
