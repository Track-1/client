import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ColorsTypes, FontsTypes } from '../../../style/theme';

type tagTpyes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'b'
  | 'small'
  | 'i'
  | 'p'
  | 'span'
  | 'del'
  | 'em'
  | 'li'
  | 'ul'
  | 'blockquote';

interface TextProps {
  as: tagTpyes;
  font: keyof FontsTypes;
  color: keyof ColorsTypes;
  margin?: string;
  lineHeight?: string;
  letterSpacing?: string;
  overflow?: string;
}

export default function Text(props: PropsWithChildren<TextProps>) {
  const { as, font, color, margin, lineHeight, letterSpacing, overflow, children } = props;
  return (
    <StyledText
      as={as}
      font={font}
      color={color}
      margin={margin}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      overflow={overflow}>
      {children}
    </StyledText>
  );
}

export const StyledText = styled.span<{
  font: keyof FontsTypes;
  color: keyof ColorsTypes;
  margin?: string;
  lineHeight?: string;
  letterSpacing?: string;
  overflow?: string;
}>`
  ${({ font, theme }) => theme.fonts[font]}
  color: ${({ theme, color }) => theme.colors[color]};
  margin: ${({ margin }) => margin && margin};
  line-height: ${({ lineHeight }) => lineHeight && lineHeight};
  letter-spacing: ${({ letterSpacing }) => letterSpacing && letterSpacing};
  overflow: ${({ overflow }) => overflow && overflow};

  white-space: pre-line;
  text-overflow: ellipsis;

  user-select: text;
`;
