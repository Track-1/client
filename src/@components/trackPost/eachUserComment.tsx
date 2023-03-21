import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { PauseBtnIc, PlayBtnIc, EllipsisIc } from "../../assets";
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
  // commentId:number;
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
  }
  
  useEffect(()=>{
    isEdit&&setEditModalToggle(false);
  },[isEdit])

  useEffect(()=>{
    isUpdated&&setIsEdit(false)
  },[isUpdated])
  
  useEffect(()=>{
    setCommentId(commentInfo.commentId);
  },[])

  return (
    <>
    {isEdit?<CommentUpdate getUploadData={getUploadData} comment={commentInfo.comment} fileGetName={`${commentInfo.fileName}`} isUpdated={isUpdated} setIsUpdated={setIsUpdated}/>:(
    <CommentContainer onMouseOver={hoverComment} onMouseOut={detachComment}>
      <ProfileImage img={commentInfo.vocalProfileImage}>
        {isHover && !isClickedPlayingComment() && (
          <PlayerBlur onClick={() => playAudio(currentIndex)}>
            <PlayBtnIc />
          </PlayerBlur>
        )}
        {isClickedPlayingComment() && (
          <PlayerBlur onClick={pauseAudio}>
            <PauseBtnIc />
          </PlayerBlur>
        )}
      </ProfileImage>
      <InfoBox>
        <InfoTopWrapper>
          <UserName>{commentInfo.vocalName}</UserName>
          {isMe && <EllipsisIcon onClick={changeToggleState} />}
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

const ProfileImage = styled.div<{ img: string }>`
  height: 9rem;
  width: 9rem;
  margin-right: 2rem;
  margin-left: 3.8rem;
  border-radius: 9rem;
  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: contain;
`;

const PlayerBlur = styled.div`
  height: 9rem;
  width: 9rem;
  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* pointer-events: none; */
`;

const InfoBox = styled.div`
  height: 8rem;
  width: 79rem;
`;

const InfoTopWrapper = styled.div`
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
  float: right;
  cursor: pointer;
`;
