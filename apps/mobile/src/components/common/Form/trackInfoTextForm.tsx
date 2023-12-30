import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { ColorsTypes } from '../../../style/theme';
import Text from '../Text';
import { CategoryType } from '../../../type/common/category';

interface TrackInfoFormProps {
  topItem?: string | CategoryType;
  topItemColor?: keyof ColorsTypes;
  middleItem: string;
  middleItemMargin?: string;
  align?: 'space-between';
}

export default function TrackInfoTextForm(props: PropsWithChildren<TrackInfoFormProps>) {
  const { topItem, topItemColor, middleItem, middleItemMargin, align, children } = props;
  return (
    <Container align={align}>
      <div>
        {topItem && topItemColor && (
          <Text as="p" font="Pre_14_R" color={topItemColor} margin="0 0 0.5rem 0">
            {topItem}
          </Text>
        )}
        <Text as="p" font="Alex_16_R" color="white" margin={middleItemMargin || '0 0 1rem 0'}>
          {middleItem}
        </Text>
      </div>
      <LastItemWrapper>{children}</LastItemWrapper>
    </Container>
  );
}
const Container = styled.div<{ align?: 'space-between' }>`
  display: flex;
  justify-content: ${({ align }) => align && align};
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
