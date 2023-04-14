import { useEffect, useState } from "react";
import styled from "styled-components";
import { PlayBtnIc, EllipsisIc, PauseButtonIc, CommentUpldatCompleteIc } from "../../assets";
import { UserCommentType } from "../../type/userCommentsType";
import { useRecoilState } from "recoil";
import { showPlayerBar, playMusic } from "../../recoil/player";
import { isSameIndex } from "../../utils/common/checkIndex";
import EditDropDownComment from "./editDropDownComment";
import CommentUpdate from "./commentUpdate";
import { useNavigate } from "react-router-dom";

interface PropsType {
  commentInfo: any;
  audio: HTMLAudioElement;
  clickedIndex: number;
  pauseAudio: () => void;
  clickComment: (index: number) => void;
  currentIndex: number;
  isMe: boolean;
  getUploadData: (content: string, audioFile: File | null, fileName: string) => any;
  isUpdated: boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentId: React.Dispatch<React.SetStateAction<number>>;
  setKey: any;
  setIsDeleted: any;
}

export default function EachUserComment(props: PropsType) {
  const {
    commentInfo,
    audio,
    clickedIndex,
    clickComment,
    currentIndex,
    pauseAudio,
    isMe,
    getUploadData,
    isUpdated,
    setIsUpdated,
    setCommentId,
    setKey,
    setIsDeleted,
  } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [editModalToggle, setEditModalToggle] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  console.log(commentInfo);

  function hoverComment() {
    setIsHover(true);
  }

  function detachComment() {
    setIsHover(false);
  }

  function playAudio(id: number) {
    setShowPlayer(true);
    setPlay(true);
    clickedIndex === id ? audio.play() : clickComment(currentIndex);
  }

  function isClickedComment() {
    return isSameIndex(clickedIndex, currentIndex);
  }

  function isClickedPlayingComment() {
    return play && isClickedComment();
  }

  function changeToggleState() {
    setEditModalToggle(true);
    setCommentId(commentInfo.commentId);
  }

  useEffect(() => {
    isEdit && setEditModalToggle(false);
  }, [isEdit]);

  useEffect(() => {
    isUpdated && setIsEdit(false);
  }, [isUpdated]);

  function moveVocalProfile() {
    pauseAudio();
    setShowPlayer(false);
    setPlay(false);

    navigate(`/vocal-profile/${commentInfo?.vocalId}`, { state: commentInfo?.vocalId });
  }

  return (
    <>
      {isEdit ? (
        <CommentUpdate
          getUploadData={getUploadData}
          comment={commentInfo.comment}
          fileGetName={`${commentInfo.fileName}`}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          setIsEdit={setIsEdit}
        />
      ) : (
        <CommentContainer
          onMouseOver={hoverComment}
          onMouseOut={detachComment}
          data-play={play}
          commentClickBool={isSameIndex(clickedIndex, currentIndex)}
          commentClick={clickedIndex}>
          <ProfileImageWrapper>
            {isHover && !isClickedPlayingComment() && (
              <PlayerBlurWrapper onClick={() => playAudio(currentIndex)}>
                <PlayerBlur>
                  <ProfileImage src={commentInfo.vocalProfileImage} isHover={isHover} />
                </PlayerBlur>
                <PlayBtnIcon />
              </PlayerBlurWrapper>
            )}
            {isClickedPlayingComment() && (
              <PlayerBlurWrapper onClick={pauseAudio}>
                <PlayerBlur>
                  <ProfileImage src={commentInfo.vocalProfileImage} isHover={isHover} />
                </PlayerBlur>
                <PauseButtonIcon />
              </PlayerBlurWrapper>
            )}
            <ProfileImage src={commentInfo.vocalProfileImage} isHover={isHover} />
          </ProfileImageWrapper>
          <InfoBox>
            <InfoTopWrapper>
              <UserName onClick={moveVocalProfile}>{commentInfo.vocalName}</UserName>
              {isMe && <EllipsisIcon onClick={changeToggleState} />}
            </InfoTopWrapper>
            <CommentText>{commentInfo.comment}</CommentText>
            {editModalToggle && (
              <EditDropDownComment
                currentId={commentInfo.commentId}
                setIsEdit={setIsEdit}
                editModalToggle={editModalToggle}
                setEditModalToggle={setEditModalToggle}
                setKey={setKey}
                setIsDeleted={setIsDeleted}
              />
            )}
          </InfoBox>
        </CommentContainer>
      )}
    </>
  );
}

const CommentContainer = styled.article<{ commentClickBool: boolean; commentClick: number }>`
  position: relative;
  height: 14.2rem;
  display: flex;
  align-items: center;
  border: 0.2rem solid transparent;
  border-top-left-radius: 11.7rem;
  border-bottom-left-radius: 11.7rem;
  background-origin: border-box;
  background-clip: content-box, border-box;
  &:hover {
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(to right, ${({ theme }) => theme.colors.sub2}, ${({ theme }) => theme.colors.sub3});
  }
  &[data-play="true"] {
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(
        to right,
        ${({ theme, commentClickBool, commentClick }) => commentClickBool && commentClick !== -1 && theme.colors.sub2},
        ${({ theme }) => theme.colors.sub3}
      );
  }
`;

const ProfileImage = styled.img<{ isHover: boolean }>`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  backdrop-filter: blur(${({ isHover }) => isHover && 0.6}rem);
  -webkit-filter: blur(${({ isHover }) => isHover && 0.6}rem);

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
const PlayerBlur = styled.div`
  height: 9rem;
  width: 9rem;

  position: relative;
  /* background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  -webkit-filter: blur(0.6rem); */
`;
const PlayerBlurWrapper = styled.div`
  height: 9rem;
  width: 9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const InfoBox = styled.div`
  height: 8rem;
  width: 78rem;

  margin-left: 15rem;
  margin-top: -3rem;
`;

const InfoTopWrapper = styled.div`
  height: 2rem;
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const UserName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag}

  cursor: pointer;
  &:hover{
    color: ${({ theme }) => theme.colors.sub2};
  }
`;

const CommentText = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description}
  margin-top: 1.2rem;
  line-height: 2.88rem;
`;

const EllipsisIcon = styled(EllipsisIc)`
  width: 4rem;
  margin-top: -2rem;
  float: right;
  cursor: pointer;
`;

const PlayBtnIcon = styled(PlayBtnIc)`
  position: absolute;
  z-index: 2;
  height: 2.4rem;
`;

const PauseButtonIcon = styled(PauseButtonIc)`
  position: absolute;
  z-index: 2;
  height: 2.4rem;
`;
