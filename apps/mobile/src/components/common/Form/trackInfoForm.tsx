import { PropsWithChildren, ReactNode } from 'react';
import { CategoryType } from '../../../type/common/category';
import styled from 'styled-components';
import { ColorsTypes, theme } from '../../../style/theme';

interface TrackInfoFormProps {
  topItem?: string | CategoryType;
  topItemColor?: keyof ColorsTypes;
  middleItem: string;
}

export default function TrackInfoForm(props: PropsWithChildren<TrackInfoFormProps>) {
  const { topItem, topItemColor, middleItem, children } = props;
  return (
    <Container>
      {topItem && <TopItem topItemColor={topItemColor}>{topItem}</TopItem>}
      <MiddleItem>{middleItem}</MiddleItem>
      {children}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopItem = styled.p<{ topItemColor: keyof ColorsTypes | undefined }>`
  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${(props) => props.topItemColor && theme.colors[props.topItemColor]};

  margin-bottom: 0.5rem;
`;

const MiddleItem = styled.p`
  ${({ theme }) => theme.fonts.Alex_16_R};
  color: ${({ theme }) => theme.colors.white};

  margin-bottom: 1rem;
`;
