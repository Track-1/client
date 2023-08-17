import { useState } from "react";
import styled from "styled-components";
import { PauseButtonIc, PlayButtonIc } from "../../assets";
import { CommentType } from "../../type/trackPost/commentType";
import CommentInfo from "./commentInfo";

interface CommentBoxProps {
  eachComment: CommentType;
}

export default function CommentBox(props: CommentBoxProps) {
  const { eachComment } = props;
  const {
    commentUserId,
    commentId,
    commentAudioFile,
    userName,
    userImageFile,
    commentContent,
    userSelf,
    commentAudioFileLength,
    commentFileName,
  } = eachComment;

  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [play, setPlay] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);

  return (
    <CommentContainer>
      <ProfileImageWrapper>
        <ProfileImageBox>
          <ProfileImage src={userImageFile} />
        </ProfileImageBox>
        {play ? <PlayButtonIcon /> : <PauseButtonIcon />}
      </ProfileImageWrapper>
      <CommentInfo userName={userName} userSelf={userSelf} commentContent={commentContent} />
    </CommentContainer>
  );
}

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

const ProfileImageBox = styled.div`
  height: 9rem;
  width: 9rem;

  position: relative;

  &:hover {
    filter: blur(0.6rem);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  height: 9rem;
  width: 9rem;

  border-radius: 9rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  overflow: hidden;

  margin-left: 3rem;
`;

const CommentContainer = styled.article`
  display: flex;
  align-items: center;

  position: relative;
  height: 14.2rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 11.7rem;
  border-bottom-left-radius: 11.7rem;

  background-origin: border-box;
  background-clip: content-box, border-box;

  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(to right, ${({ theme }) => theme.colors.sub2}, ${({ theme }) => theme.colors.sub3});
  }
`;
