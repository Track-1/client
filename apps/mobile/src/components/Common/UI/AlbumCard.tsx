import { AudioCover, CoverFrame, MusicCover, MusicCoverProps } from './Cover';

interface AlbumCardProps extends MusicCoverProps {}

export default function AlbumCard(props: AlbumCardProps) {
  const { imageSrc, imageAlt, coverSize, coverShape, audioSrc, audioTitle, userName, iconPosition } = props;

  return (
    <>
      <h1 style={{ color: 'white', fontSize: '20px', marginBottom: '5px' }}>{audioTitle}</h1>
      {/* <MusicCover
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        coverSize={coverSize}
        coverShape={coverShape}
        audioSrc={audioSrc}
        audioTitle={audioTitle}
        userName={userName}
        iconPosition={iconPosition}
      /> */}

      <AudioCover audioSrc={audioSrc} audioTitle={audioTitle} userName={userName} iconPosition={iconPosition}>
        <CoverFrame imageSrc={imageSrc} imageAlt={imageAlt} coverSize={coverSize} coverShape={coverShape} />
      </AudioCover>
    </>
  );
}
