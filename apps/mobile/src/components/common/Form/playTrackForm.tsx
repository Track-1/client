import styled, { CSSProperties, css } from 'styled-components';
import { PauseIc, PlayIc } from '../../../assets';

interface PlayTrackForm {
  iconProperties: CSSProperties;
  shapeProperties: CSSProperties;
  isPlaying: boolean;
}

export default function PlayTrackForm(props: any) {
  const { iconProperties, shapeProperties, isPlaying } = props;

  return (
    <Container>
      <ImageWrapper isPlaying={isPlaying} style={shapeProperties}>
        <IconWrapper style={iconProperties}>{isPlaying ? <PauseIc /> : <PlayIc />}</IconWrapper>
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ isPlaying: boolean }>`
  width: 100%;
  height: 100%;

  object-fit: cover;

  ${(props) =>
    props.isPlaying
      ? css`
          background: rgba(13, 14, 17, 0.5);
        `
      : css`
          background: transparent;
        `}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
