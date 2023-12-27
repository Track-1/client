import styled from 'styled-components';
import { ColorsTypes, FontsTypes } from '../../../style/theme';
import { PropsWithChildren } from 'react';

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
  | 'blockquote';

interface TextProps {
  as: tagTpyes;
  font: keyof FontsTypes;
  color: keyof ColorsTypes;
  margin?: string;
}

export default function Text(props: PropsWithChildren<TextProps>) {
  const { as, font, color, margin, children } = props;
  return (
    <StyledText as={as} font={font} color={color} margin={margin}>
      {children}
    </StyledText>
  );
}

export const StyledText = styled.span<{ font: keyof FontsTypes; color: keyof ColorsTypes; margin?: string }>`
  ${(props) =>
    ({ theme }) =>
      theme.fonts[props.font]};
  color: ${(props) =>
    ({ theme }) =>
      theme.colors[props.color]};

  margin: ${(props) => props.margin && props.margin};
  white-space: pre-line;
`;
