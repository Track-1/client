import styled from "styled-components";
import { TrackPostPauseBtnIc, TrackPostPlayBtnIc } from "../../assets";

export default function PlayButton() {
  //   const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);
  //   const { progress, audio, pausesPlayerAudio, closePlayer } = usePlayer();

  return (
    // <>{!isCommentOpen && play ? <PauseBtnIcon onClick={pauseAudio} /> : <SmallPlayBtnIcon onClick={playAudio} />}</>
    <>
      <TrackPostPauseBtnIcon />
    </>
  );
}

const TrackPostPauseBtnIcon = styled(TrackPostPauseBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;

const TrackPostPlayBtnIcon = styled(TrackPostPlayBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;
