import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CommentsPlayerContext } from ".";
import { EllipsisIc } from "../../assets";
import { isModalOpen } from "../../recoil/common/isModalOpen";
import { editSelectId } from "../../recoil/trackPost/commentWriteData";
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
  const { userName, userSelf, commentContent, commentUserId, setIsEdit, commentId } = props;
  const navigate = useNavigate();
  const [editModalToggle, setEditModalToggle] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useRecoilState<boolean>(isModalOpen);
  const { quitAudioForMovePage } = useContext(CommentsPlayerContext);
  const [editId, setEditId] = useRecoilState(editSelectId);

  function handleMoveVocalProfile() {
    quitAudioForMovePage();

    navigate(`/vocal-profile/${commentUserId}`);
  }

  function handleShowEditDropDownComment() {
    if (editId !== -1) return;
    setEditId(commentId);
    setEditModalToggle(true);
    setIsOpenModal(true);
  }

  return (
    <CommentWrapper>
      <InfoTopWrapper>
        <UserName onClick={handleMoveVocalProfile}>{userName}</UserName>
        {userSelf && <EllipsisIcon onClick={handleShowEditDropDownComment} />}
        {editModalToggle && isOpenModal && <EditDropDownComment setIsEdit={setIsEdit} commentId={commentId} />}
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

  margin-top: -3rem;
`;

const CommentText = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description}
  margin-top: 1.2rem;
  line-height: 2.88rem;
  word-break: break-all;
`;

const UserName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag}

  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.sub2};
  }
`;
