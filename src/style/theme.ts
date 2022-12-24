import { DefaultTheme } from "styled-components";

const colors = {
  main: "#5200FF",
  sub1: "#43FF8E",
  sub2: "#E965FF",
  sub3: "#0D0E11",
};

export type ColorsTypes = typeof colors;

interface Font {
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

function FONT({ weight, size, lineHeight, letterSpacing }: Font): string {
  return `
    font-family: Pretendard;
    font-weight : ${weight};
    font-size : ${size}rem;
    line-height : ${lineHeight}%;
    letter-spacing : ${letterSpacing}rem
    `;
}

const fonts = {};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
