import { DefaultTheme, FlattenSimpleInterpolation, css } from 'styled-components';

const colors = {
  //컬러 변경했습니다!!
  neon_purple: '#5200FF',
  neon_green: '#43FF8E',
  neon_pink: '#E965FF',

  gray1: '#D9D9D9',
  gray2: '#9EA1AB',
  gray3: '#535559',
  gray4: '#313338',
  gray5: '#1E2025',
  gray6: '#141517',

  white: '#FFFFFF',
  black: '#0D0E11',
  red: '#FF4F4F',
};

export type ColorsTypes = typeof colors;

const fonts = (() => {
  const families = [
    ['Pre', 'Pretendard'],
    ['Alex', 'Alexandria'],
  ] as const;
  const sizes = [10, 12, 13, 14, 15, 16, 18, 20, 25, 30, 34, 40, 50, 60] as const;
  const weights = [
    ['L', 300],
    ['R', 400],
    ['M', 500],
    ['SB', 600],
    ['B', 700],
  ] as const;

  type FontKey = `${(typeof families)[number][0]}_${(typeof sizes)[number]}_${(typeof weights)[number][0]}`;

  type FontStylesType = { [K in FontKey]?: FlattenSimpleInterpolation };
  const fontStyles: FontStylesType = {};

  for (const family of families) {
    for (const size of sizes) {
      for (const weight of weights) {
        fontStyles[`${family[0]}_${size}_${weight[0]}`] = css`
          font-family: ${family[1]};
          font-size: ${size / 10}rem;
          font-weight: ${weight[1]};
        `;
      }
    }
  }

  return fontStyles;
})();

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
