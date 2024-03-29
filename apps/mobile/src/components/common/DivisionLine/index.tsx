import styled, { css } from 'styled-components';
import { ColorsTypes } from '../../../style/theme';
import { PADDING_SIDE } from '../../layout';

export const StyledLined = styled.hr<{ color?: keyof ColorsTypes }>`
  width: 100%;
  height: 1px;

  border: none;

  background-color: ${(props) =>
    props.color ? ({ theme }) => theme.colors[props.color as keyof ColorsTypes] : ({ theme }) => theme.colors.gray5};
`;

export const StyledVerticalLined = styled(StyledLined)<{ width: number }>`
  width: ${(props) => props.width}rem;
  height: 1px;
  border: none;

  -ms-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);

  background-color: ${({ theme }) => theme.colors.gray4};
`;

export const StyledDivisionLine = styled.hr`
  width: calc(${`100% + ${PADDING_SIDE}*2`});

  height: 1px;

  border: none;

  background-color: ${({ theme }) => theme.colors.gray5};

  margin-left: ${`-${PADDING_SIDE}`};
`;
