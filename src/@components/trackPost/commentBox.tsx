import { useState } from "react";
import styled from "styled-components";
import { CommentType } from "../../type/trackPost/commentType";
import { checkIsSameId } from "../../utils/common/checkHover";
import CommentInfo from "./commentInfo";
import CommentProfileEventBox from "./commentProfileEventBox";

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
  const [clickId, setClickId] = useState(-1);
  const [hoverId, setHoverId] = useState(-1);
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);

  function handleHoverComment() {
    setHoverId(commentId);
  }

  function handleDetachComment() {
    setHoverId(-1);
  }

  function handlePlayComment() {
    setClickId(commentId);
  }

  return (
    <CommentContainer
      // data-play={play}
      commentActive={checkIsSameId(commentId, clickId) || checkIsSameId(commentId, hoverId)}>
      <ProfileImageWrapper
        onMouseOver={handleHoverComment}
        onMouseOut={handleDetachComment}
        onClick={handlePlayComment}>
        <CommentProfileEventBox currentId={commentId} clickId={clickId} hoverId={hoverId}>
          <ProfileImage src={userImageFile} />
        </CommentProfileEventBox>
      </ProfileImageWrapper>
      <CommentInfo
        userName={userName}
        userSelf={userSelf}
        commentContent={commentContent}
        commentUserId={commentUserId}
      />
    </CommentContainer>
  );
}

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

  cursor: pointer;
`;

const CommentContainer = styled.article<{ commentActive: boolean }>`
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

  background-image: linear-gradient(
      ${({ theme, commentActive }) => commentActive && theme.colors.sub3},
      ${({ theme, commentActive }) => commentActive && theme.colors.sub3}
    ),
    linear-gradient(
      to right,
      ${({ theme, commentActive }) => commentActive && theme.colors.sub2},
      ${({ theme, commentActive }) => commentActive && theme.colors.sub3}
    );
`;
