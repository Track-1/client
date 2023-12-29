import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { CategoryType } from '../../type/common/category';
import Text from '../common/Text';
import { MoreDotIc } from '../../assets';
import { ImageWrapper } from '../common/Interface';

interface TrackItemProps {
  trackTitle: string;
  trackUserName: string;
  trackCategory: CategoryType;
}

export default function TrackSearchItem(props: PropsWithChildren<TrackItemProps>) {
  const { trackTitle, trackUserName, trackCategory, children } = props;

  return (
    <Container>
      {children}
      <TrackItemInfoWrapper>
        <TrackUserInfoWrapper>
          <Text as="p" font="Pre_14_M" color="white">
            {trackTitle}
          </Text>
          <Text as="p" font="Pre_12_R" color="white">
            {trackUserName}
          </Text>
        </TrackUserInfoWrapper>
        <TrackCategoryWrapper>
          <Text as="p" font="Pre_14_R" color="neon_green">
            {trackCategory}
          </Text>
          <ImageWrapper as="button" width={3} height={3}>
            <MoreDotIc />
          </ImageWrapper>
        </TrackCategoryWrapper>
      </TrackItemInfoWrapper>
    </Container>
  );
}

const Container = styled.li`
  display: flex;

  width: 100%;
  height: 8rem;

  padding: 2rem 0;
`;

const TrackItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-left: 1rem;
`;

const TrackUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 11.8rem);
  height: 100%;

  padding: 0.1rem 0;
`;

const TrackCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.8rem;
`;
