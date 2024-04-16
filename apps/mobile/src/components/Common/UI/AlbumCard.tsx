import { AudioCover, AudioCoverProps, ImageCover, ImageCoverProps } from './Cover';

type AlbumCardProps = ImageCoverProps & AudioCoverProps;

export default function AlbumCard(props: AlbumCardProps) {
  const { imageSrc, imageAlt, coverSize, coverShape, audioSrc, audioTitle, userName, iconPosition } = props;

  return (
    <>
      <AudioCover audioSrc={audioSrc} audioTitle={audioTitle} userName={userName} iconPosition={iconPosition}>
        <ImageCover imageSrc={imageSrc} imageAlt={imageAlt} coverSize={coverSize} coverShape={coverShape} />
      </AudioCover>
    </>
  );
}

function AlbumInfo() {
  return;
}
