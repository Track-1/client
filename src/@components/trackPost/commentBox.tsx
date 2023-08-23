import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { updateComment } from "../../api/trackPost/updateComment";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { playMusic } from "../../recoil/common/playMusic";
import { clickedTrackId } from "../../recoil/trackPost/clickedTrackId";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentType } from "../../type/trackPost/commentType";
import { checkIsClickedNothing, checkIsSameId } from "../../utils/common/checkHover";
import CommentInfo from "./commentInfo";
import CommentProfileEventBox from "./commentProfileEventBox";
import CommentWrite from "./commentWrite";

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

  const [clickId, setClickId] = useRecoilState(clickedTrackId);
  const [hoverState, setHoverState] = useState<boolean>(false);
  // const [hoverId, setHoverId] = useState(-1);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [comment, setComment] = useRecoilState(commentWriteData);
  const resetComment = useResetRecoilState(commentWriteData);

  function handlePlayComment() {
    setClickId(commentId); //나중에 지우기

    if (play) {
      setPlay(false);
      // pauseAudio;
    } else {
      setPlay(true);
      // checkIsSameId(commentId, clickId) ? audio.play() : setClickId(commentId);
    }
  }

  function handleHoverEvent(isHover: boolean) {
    setHoverState(isHover);
  }

  const queryClient = useQueryClient();

  const { mutate: updateCommentContent } = useMutation(() => updateComment(comment, commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
      resetComment();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleUploadComment() {
    if (comment?.commentContent?.length > 0) {
      updateCommentContent();
    }
  }

  useEffect(() => {
    if (isEdit) {
      setComment({ ...comment, commentAudioFileName: commentFileName, commentContent: commentContent });
    }
  }, [isEdit]);

  return (
    <>
      {isEdit ? (
        <CommentWrite />
      ) : (
        <CommentContainer
          data-play={play}
          commentActive={checkIsSameId(commentId, clickId) && !checkIsClickedNothing(clickId)}>
          <ProfileImageWrapper
            onMouseOver={() => handleHoverEvent(true)}
            onMouseOut={() => handleHoverEvent(false)}
            onClick={handlePlayComment}>
            <CommentProfileEventBox currentId={commentId} hoverState={hoverState}>
              <ProfileImage src={userImageFile} />
            </CommentProfileEventBox>
          </ProfileImageWrapper>
          <CommentInfo
            userName={userName}
            userSelf={userSelf}
            commentContent={commentContent}
            commentUserId={commentUserId}
            commentId={commentId}
            setIsEdit={setIsEdit}
          />
        </CommentContainer>
      )}
    </>
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

  margin-left: 3.6rem;

  cursor: pointer;
`;

const CommentContainer = styled.article<{ commentActive: boolean }>`
  display: flex;
  align-items: center;

  position: relative;
  height: 17.4rem;

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

  /* &[data-play="true"] { */
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to right,
      ${({ theme, commentActive }) => commentActive && theme.colors.sub2},
      ${({ theme }) => theme.colors.sub3}
    );
  /* } */
`;
