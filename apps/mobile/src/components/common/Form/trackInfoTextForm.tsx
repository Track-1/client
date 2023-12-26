import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ColorsTypes } from '../../../style/theme';
import Text from '../Text';

interface TrackInfoFormProps {
  topItem?: string;
  topItemColor?: keyof ColorsTypes;
  middleItem: string;
  lastItemColor?: keyof ColorsTypes;
}

export default function TrackInfoTextForm(props: PropsWithChildren<TrackInfoFormProps>) {
  const { topItem, topItemColor, middleItem, lastItemColor, children } = props;
  return (
    <Container>
      {topItem && topItemColor && (
        <Text as="span" font="Pre_14_R" color={topItemColor}>
          {topItem}
        </Text>
      )}
      <Text as="span" font="Alex_16_R" color="white">
        {middleItem}
      </Text>
      <LastItemWrapper>{children}</LastItemWrapper>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopItem = styled.p<{ topItemColor?: keyof ColorsTypes }>`
  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${(props) =>
    props.topItemColor
      ? ({ theme }) => theme.colors[props.topItemColor as keyof ColorsTypes]
      : ({ theme }) => theme.colors.white};

  margin-bottom: 0.5rem;
`;

const MiddleItem = styled.p`
  ${({ theme }) => theme.fonts.Alex_16_R};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 1rem;
`;

const LastItemWrapper = styled.div<{ lastItemColor?: keyof ColorsTypes }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;
  ${({ theme }) => theme.fonts.Pre_14_M};
  color: ${(props) =>
    props.lastItemColor
      ? ({ theme }) => theme.colors[props.lastItemColor as keyof ColorsTypes]
      : ({ theme }) => theme.colors.gray3};

  &:last-child {
    gap: 0;
  }
`;
