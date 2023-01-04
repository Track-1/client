import { DefaultTheme } from "styled-components";

const colors = {
  main: "#5200FF",
  sub1: "#43FF8E",
  sub2: "#E965FF",
  sub3: "#0D0E11",
  gray1: "#D9D9D9",
  gray2: "#9EA1AB",
  gray3: "#535559",
  gray4: "#1E2025",
  gray5: "#1E2025",
  gray6: "#141517",
  white: "#FFFFFF",
};

export type ColorsTypes = typeof colors;

interface Font {
  weight: number;
  size: number;
  lineHeight: number;
}

function FONT({ weight, size, lineHeight }: Font): string {
  return `
    font-family: YDestreet;
    font-weight : ${weight};
    font-size : ${size}rem;
    line-height : ${lineHeight}rem;
    `;
}

const fonts = {
  hashtag: FONT({ weight: 300, size: 1.5, lineHeight: 1.9 }),
  cations: FONT({ weight: 400, size: 1.6, lineHeight: 1.9 }),
  body1: FONT({ weight: 300, size: 1.8, lineHeight: 2.3 }),
  comment: FONT({ weight: 400, size: 1.8, lineHeight: 3.5 }),
  description: FONT({ weight: 400, size: 1.6, lineHeight: 2.9 }),
  player_title: FONT({ weight: 700, size: 2, lineHeight: 2.6 }),
  id: FONT({ weight: 300, size: 2, lineHeight: 2.6 }),
  caption_large: FONT({ weight: 300, size: 3, lineHeight: 3.9 }),
  title: FONT({ weight: 300, size: 5, lineHeight: 6.5 }),
};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
