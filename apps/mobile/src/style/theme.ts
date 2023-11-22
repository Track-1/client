import { DefaultTheme } from "styled-components";

const colors = {
  //컬러 변경했습니다!!
  purple: "#5200FF",
  neon_pink: "#43FF8E",
  neon_green: "#E965FF",

  gray1: "#D9D9D9",
  gray2: "#9EA1AB",
  gray3: "#535559",
  gray4: "#313338",
  gray5: "#1E2025",
  gray6: "#141517",

  white: "#FFFFFF",
  black: "#0D0E11",
  red: "#FF4F4F",
};

export type ColorsTypes = typeof colors;

interface Font {
  family: boolean;
  weight: number;
  size: number;
  lineHeight: number | string;
  renewal?: boolean;
}

function FONT({ family, weight, size, lineHeight, renewal }: Font): string {
  return `
    font-family: ${renewal ? "Alexandria" : family ? "YDestreet" : "Pretendard"};
    font-weight : ${weight};
    font-size : ${size}rem;
    line-height : ${typeof lineHeight === "string" ? lineHeight : lineHeight + "rem"};
    `;
}

const fonts = {
  hashtag: FONT({ family: true, weight: 300, size: 1.5, lineHeight: 1.9 }),
  //Mobile
};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
