import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { PauseBtnIc, PlayBtnIc, EllipsisIc, PauseButtonIc } from "../../assets";
import { UserCommentType } from "../../type/userCommentsType";
import { useRecoilState } from "recoil";
import { showPlayerBar, playMusic } from "../../recoil/player";
import { isSameIndex } from "../../utils/common/checkIndex";
import useModal from "../../utils/hooks/useModal";
import EditDropDownComment from "./editDropDownComment";
import CommentUpdate from "./commentUpdate";
import { useMutation, useQueryClient } from "react-query";
import { updateComment } from "../../core/api/trackPost";

interface PropsType {
  commentInfo: UserCommentType;
  audio: HTMLAudioElement;
  clickedIndex: number;
  pauseAudio: () => void;
  clickComment: (index: number) => void;
  currentIndex: number;
  isMe: boolean;
  getUploadData: (content: string, audioFile: File | null, fileName:string) => any;
  isUpdated:boolean;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
  setCommentId: React.Dispatch<React.SetStateAction<number>>
}

export default function EachUserComment(props: PropsType) {
  const { commentInfo, audio, clickedIndex, clickComment, currentIndex, pauseAudio, isMe,getUploadData, isUpdated, setIsUpdated,setCommentId } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [editModalToggle, setEditModalToggle] = useState<boolean>(false);
  const { modalRef } = useModal();
  const [isEdit, setIsEdit]=useState<boolean>(false);

  // useEffect(()=>{
  //   setCommentId(commentId)
  // },[])
  // const modalCloseHandler = (e:any) => {
  //   if(editModalToggle && modalRef.current && !modalRef.current.contains(e.target)) setEditModalToggle(false);
  // };
  
  // useEffect(() => {
  //   window.addEventListener('click', modalCloseHandler);
  //   return () => {
  //     window.removeEventListener('click', modalCloseHandler);
  //   };
  // });

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
    setEditModalToggle(!editModalToggle);
    setCommentId(commentInfo.commentId);
  }
  
  useEffect(()=>{
    isEdit&&setEditModalToggle(false);
  },[isEdit])

  useEffect(()=>{
    isUpdated&&setIsEdit(false)
  },[isUpdated])
  
  return (
    <>
    {isEdit?<CommentUpdate getUploadData={getUploadData} comment={commentInfo.comment} fileGetName={`${commentInfo.fileName}`} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>:(
    <CommentContainer onMouseOver={hoverComment} onMouseOut={detachComment}>
     <ProfileImageWrapper>
        {isHover && !isClickedPlayingComment() && (
          <PlayerBlurWrapper onClick={() => playAudio(currentIndex)}>
            <PlayBtnIcon />
            <PlayerBlur></PlayerBlur>
          </PlayerBlurWrapper>
        )}
        {isClickedPlayingComment() && (
          <PlayerBlurWrapper onClick={pauseAudio}>
            <PauseButtonIcon />
            <PlayerBlur></PlayerBlur>
          </PlayerBlurWrapper>
        )}
         <ProfileImage src={commentInfo.vocalProfileImage}/>
      </ProfileImageWrapper>
      <InfoBox>
        <InfoTopWrapper>
          <UserName>{commentInfo.vocalName}</UserName>
          {isMe && <EllipsisIcon onClick={changeToggleState}/>}
        </InfoTopWrapper>
        {editModalToggle && (<div ref={modalRef}><EditDropDownComment currentId={commentInfo.commentId} setIsEdit={setIsEdit} /></div>)}
        <CommentText>{commentInfo.comment}</CommentText>
      </InfoBox>
    </CommentContainer>)}
    </>
  );
}

const CommentContainer = styled.article`
  position: relative;
  height: 14.2rem;
  display: flex;
  align-items: center;
  &:hover {
    border: 0.2rem solid transparent;
    border-top-left-radius: 11.7rem;
    border-bottom-left-radius: 11.7rem;
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(to right, ${({ theme }) => theme.colors.sub2}, ${({ theme }) => theme.colors.sub3});
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
`;

const ProfileImageWrapper=styled.div`
  height: 9rem;
  width: 9rem;
  overflow: hidden;
  margin-right: 2rem;
  margin-left: 3.8rem;
  border-radius: 9rem;

`
const PlayerBlur = styled.div`
  background-color: rgb(0,0,0,0.5);
  backdrop-filter: blur(0.6rem);
  -webkit-filter: blur(0.6rem);
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
  width: 79rem;
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

const PlayBtnIcon=styled(PlayBtnIc)`
  position: absolute;
  height: 2.4rem;
`

const PauseButtonIcon=styled(PauseButtonIc)`
  position: absolute;
  height: 2.4rem;
`