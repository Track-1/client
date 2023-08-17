import styled from "styled-components";
import { EllipsisIc } from "../../assets";

interface CommentInfoProps {
  userName: string;
  userSelf: boolean;
  commentContent: string;
}

export default function CommentInfo(props: CommentInfoProps) {
  const { userName, userSelf, commentContent } = props;

  return (
    <CommentWrapper>
      <InfoTopWrapper>
        <UserName>{userName}</UserName>
        {userSelf && <EllipsisIcon />}
      </InfoTopWrapper>
      <CommentText>{commentContent}</CommentText>
    </CommentWrapper>
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
