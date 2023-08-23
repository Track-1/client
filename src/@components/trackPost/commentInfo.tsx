import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { EllipsisIc } from "../../assets";
import { isModalOpen } from "../../recoil/common/isModalOpen";
import EditDropDownComment from "./editDropDownComment";

interface CommentInfoProps {
  userName: string;
  userSelf: boolean;
  commentContent: string;
  commentUserId: number;
  commentId: number;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function CommentInfo(props: CommentInfoProps) {
  const { userName, userSelf, commentContent, commentUserId, commentId, setIsEdit } = props;
  const navigate = useNavigate();
  const [editModalToggle, setEditModalToggle] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(isModalOpen);
  //   const [play, setPlay] = useRecoilState<boolean>(playMusic);

  function handleMoveVocalProfile() {
    // pauseAudio();
    // setShowPlayer(false);
    // setPlay(false);

    navigate(`/vocal-profile/${commentUserId}`);
  }

  function handleShowEditDropDownComment() {
    setEditModalToggle(true);
    setIsOpenModal(true);
  }

  console.log(commentId);
  console.log("editModalToggle " + editModalToggle);
  console.log("isOpenModal " + isOpenModal);

  return (
    <CommentWrapper>
      <InfoTopWrapper>
        <UserName onClick={handleMoveVocalProfile}>{userName}</UserName>
        {userSelf && <EllipsisIcon onClick={handleShowEditDropDownComment} />}
        {editModalToggle && isOpenModal && <EditDropDownComment setIsEdit={setIsEdit} />}
      </InfoTopWrapper>
      <CommentText>{commentContent}</CommentText>
    </CommentWrapper>
  );
}

const EllipsisIcon = styled(EllipsisIc)`
  position: absolute;
  right: 0;

  width: 4rem;
  margin-top: -2rem;
  float: right;
  cursor: pointer;
`;

const InfoTopWrapper = styled.div`
  height: 2rem;
  margin-bottom: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const CommentWrapper = styled.li`
  height: 8rem;
  width: 78rem;

  margin-left: 15rem;
  margin-top: -3rem;
`;

const CommentText = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description}
  margin-top: 1.2rem;
  line-height: 2.88rem;
`;

const UserName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag}

  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.sub2};
  }
`;
