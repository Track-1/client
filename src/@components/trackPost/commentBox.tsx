import styled from "styled-components";
import { EllipsisIc } from "../../assets";
import { CommentType } from "../../type/trackPost/commentType";

interface CommentBoxProps {
  eachComment: CommentType;
}

export default function CommentBox(props: any) {
  const { eachComment } = props;
  //   const {
  //     commentUserId,
  //     commentId,
  //     commentAudioFile,
  //     userName,
  //     userImageFile,
  //     commentContent,
  //     userSelf,
  //     commentAudioFileLength,
  //     commentFileName,
  //   } = eachComment;
  const {
    comment,
    commentId,
    fileName,
    isMe,
    vocalId,
    vocalName,
    vocalProfileImage,
    vocalWavFile,
    vocalWavFileLength,
  } = eachComment;

  return (
    <CommentContainer>
      <CommentWrapper>
        <InfoTopWrapper>
          <UserName>{vocalName}</UserName>
          {isMe && <EllipsisIcon />}
        </InfoTopWrapper>
        <CommentText>{comment}</CommentText>
      </CommentWrapper>
    </CommentContainer>
  );
}

const EllipsisIcon = styled(EllipsisIc)`
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
  /* margin-top: -3rem; */
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
