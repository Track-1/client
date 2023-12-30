import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ColorsTypes } from '../../../style/theme';
import Text from '../Text';

interface TrackInfoFormProps {
  topItem?: string;
  topItemColor?: keyof ColorsTypes;
  middleItem: string;
  middleItemMargin?: string;
}

export default function TrackInfoTextForm(props: PropsWithChildren<TrackInfoFormProps>) {
  const { topItem, topItemColor, middleItem, middleItemMargin, children } = props;
  return (
    <Container>
      {topItem && topItemColor && (
        <Text as="span" font="Pre_14_R" color={topItemColor} margin="0 0 0.5rem 0">
          {topItem}
        </Text>
      )}
      <Text as="span" font="Alex_16_R" color="white" margin={middleItemMargin || '0 0 1rem 0'}>
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

const LastItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem 0;

  ${({ theme }) => theme.fonts.Pre_14_M};
  color:${({ theme }) => theme.colors.gray3}

  &:last-child {
    gap: 0;
  }
`;
