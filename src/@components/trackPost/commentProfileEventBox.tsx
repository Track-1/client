import { ReactNode } from "react";
import styled from "styled-components";
import { PauseButtonIc, PlayButtonIc } from "../../assets";

interface CommentProfileEventBoxProps {
  currentId: number;
  clickId: number;
  hoverId: number;
  children: ReactNode;
}

export default function CommentProfileEventBox(props: CommentProfileEventBoxProps) {
  const { currentId, clickId, hoverId, children } = props;
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);

  return (
    <ProfileImageBox>
      {children}
      <PauseButtonIcon />
      {/* {play ? <PauseButtonIcon /> : <PlayButtonIcon />} */}
    </ProfileImageBox>
  );
}

const ProfileImageBox = styled.div`
  height: 9rem;
  width: 9rem;

  position: relative;

  &:hover {
    filter: blur(0.6rem);
  }
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
