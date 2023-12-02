import { ReactNode } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PauseButtonIc, PlayButtonIc } from "../../assets";
import { playMusic } from "../../recoil/common/playMusic";
import { clickedTrackId } from "../../recoil/trackPost/clickedTrackId";
import { checkIsSameId } from "../../utils/common/checkHover";

interface CommentProfileEventBoxProps {
  currentId: number;
  children: ReactNode;
  hoverState: boolean;
}

export default function CommentProfileEventBox(props: CommentProfileEventBoxProps) {
  const { currentId, children, hoverState } = props;
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [clickId, setClickId] = useRecoilState(clickedTrackId);

  function checkIsPause() {
    return play && checkIsSameId(currentId, clickId);
  }

  function checkIsPlay() {
    return (!checkIsSameId(currentId, clickId) && hoverState) || (checkIsSameId(currentId, clickId) && !play);
  }

  return (
    <>
      <ProfileImageBox hoverState={hoverState}>{children}</ProfileImageBox>
      {checkIsPause() && <PauseButtonIcon />}
      {checkIsPlay() && <PlayButtonIcon />}
    </>
  );
}

const ProfileImageBox = styled.div<{ hoverState: boolean }>`
  height: 9rem;
  width: 9rem;

  position: relative;

  &:hover {
    filter: blur(0.6rem);
  }

  filter: blur(${({ hoverState }) => hoverState && 0.6}rem);
`;

const IconWrapper = styled.i``;

const PlayButtonIcon = styled(PlayButtonIc)`
  position: absolute;
  z-index: 2;
  height: 2.4rem;
`;

const PauseButtonIcon = styled(PauseButtonIc)`
  position: absolute;
  z-index: 2;
  height: 2.4rem;
`;
