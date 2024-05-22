import styled, { css } from 'styled-components';
import usePlaySelectedTrack from '../../hooks/common/usePlaySelectedTrack';
import Loading from '../@common/loading';
import CommentInfo from './commentInfo';
import CommentWrite from './commentWrite';
import { useEffect, useState } from 'react';
import { CommentUpldatCompleteIc, PlayerPlayIc, PlayerStopIc, QuitIc } from '../../assets';
import { useEditComment } from '../../hooks/queries/comments';
import { CommentType } from '../../type/trackPost/commentType';
import { PlayUseContext } from '../../context/playerContext';
import { useTrackDetail } from '../../hooks/queries/tracks';
import { useRecoilState } from 'recoil';
import { commentUpdateData } from '../../recoil/trackPost/commentWriteData';

interface CommentBoxProps {
  eachComment: CommentType;
  playingTrack: CommentType['commentId'] | null;
  selectTrack: (trackId: CommentType['commentId']) => void;
}

export default function CommentBox(props: CommentBoxProps) {
  const { eachComment, playingTrack, selectTrack } = props;
  const {
    commentUserId,
    commentId,
    commentAudioFile,
    userName,
    userImageFile,
    commentContent,
    userSelf,
    commentAudioFileName,
  } = eachComment;
  const { trackDetail } = useTrackDetail();
  const { editComment, isLoading } = useEditComment(() => setIsEdit(false));
  const [comment, setComment] = useRecoilState(commentUpdateData);
  const { contextPlaying, getPlayerInfo, showPlayer, ...commentPlayerContext } = PlayUseContext({ scope: 'comments' });
  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    commentPlayerContext,
    commentAudioFile,
    commentId,
    selectTrack,
    playingTrack
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const isSelected = playingTrack === commentId;

  function handleStopUpdating() {
    setIsEdit(false);
  }

  function handleSubmitUpdateComment() {
    if (comment?.commentContent?.length > 0) {
      editComment({ commentId: commentId, formData: comment });
    }
  }

  useEffect(() => {
    isEdit && setComment({ ...comment, commentContent: commentContent, commentAudioFileName: commentAudioFileName });
  }, [isEdit]);

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: userImageFile,
      title: trackDetail?.trackTitle,
      userName: userName,
    });
  }, [playingTrack]);

  return (
    <>
      {isLoading && <Loading />}
      {isEdit ? (
        <UpdateCommentContainer>
          <CommentWrite isUpdate={true} />
          <QuitIcon onClick={handleStopUpdating} />
          <CommentUpldatCompleteIcon onClick={handleSubmitUpdateComment} />
        </UpdateCommentContainer>
      ) : (
        <CommentContainer commentActive={isHovered || (isSelected && showPlayer)}>
          <ThumnailWrapper
            onMouseEnter={hoverTrack}
            onMouseLeave={unhoverTrack}
            isHovered={isHovered || (isSelected && showPlayer)}>
            <Thumbnail src={userImageFile} alt="profile-image" />
            {innerPlaying && contextPlaying ? (
              <StopButton onClick={stopAudioItem} />
            ) : (
              <PlayButton onClick={() => playAudioItem(commentId)} />
            )}
          </ThumnailWrapper>
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

const UpdateCommentContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const CommentContainer = styled.article<{ commentActive: boolean }>`
  display: flex;
  align-items: center;

  position: relative;
  height: 14.2rem;
  margin-top: 2rem;

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

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to right,
      ${({ theme, commentActive }) => commentActive && theme.colors.sub2},
      ${({ theme }) => theme.colors.sub3}
    );
`;

const ThumnailWrapper = styled.div<{ isHovered: boolean }>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 9rem;
  width: 9rem;

  margin-right: 2.8rem;
  margin-left: 2.4rem;

  border-radius: 6.55rem;
  overflow: hidden;

  ${({ isHovered }) =>
    isHovered &&
    css`
      ::before {
        position: absolute;
        top: 0;
        right: 0;

        content: '';
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* 원하는 색상과 투명도를 설정 */
        backdrop-filter: blur(6px);
      }
    `}
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const PlayButton = styled(PlayerPlayIc)`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 4rem;
  height: 4rem;

  transform: translate(-50%, -50%);
`;

const StopButton = styled(PlayerStopIc)`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 4rem;
  height: 4rem;

  transform: translate(-50%, -50%);
`;

const QuitIcon = styled(QuitIc)`
  width: 1.5rem;

  position: absolute;
  right: 8rem;
  margin-top: 2rem;

  cursor: pointer;
`;

const CommentUpldatCompleteIcon = styled(CommentUpldatCompleteIc)`
  width: 13.9rem;

  margin-left: 80rem;
  margin-top: 1.8rem;

  cursor: pointer;
`;
