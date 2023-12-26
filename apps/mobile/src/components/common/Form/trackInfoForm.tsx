import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import TrackInfoTextForm from './trackInfoTextForm';

interface TrackInfoFormProps {
  imageSrc: string;
}

export default function TrackInfoForm(props: PropsWithChildren<TrackInfoFormProps>) {
  const { imageSrc, children } = props;
  return (
    <Container>
      <VocalTrackWrapper>
        <ImageWrapper>
          <img src={imageSrc} alt="트랙 이미지" />
        </ImageWrapper>

        <TrackInfoTextForm topItem="hello" middleItem="aaa">
          hashtag
        </TrackInfoTextForm>
      </VocalTrackWrapper>
      
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const VocalTrackWrapper = styled.div`
  display: flex;

  gap: 2.5rem;

  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 12rem;
  height: 12rem;

  background-color: blue;
`;

const InfoWrapper = styled.div``;
