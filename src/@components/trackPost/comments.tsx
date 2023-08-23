import styled from "styled-components";
import { AddCommentIc, CloseCommentsBtnIc, ClosedAddCommentIc } from "../../assets";
import useGetComment from "../../hooks/trackPost/useGetComment";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";
import { CommentType } from "../../type/trackPost/commentType";
import CommentBox from "./commentBox";
import CommentLayout from "./commentLayout";
import CommentWrite from "./commentWrite";

export default function Comments() {
  const { trackComments } = useGetComment(1);
  const { trackClosed } = useGetTrackInfo();

  return (
    <CommentLayout>
      <CloseCommentsBtnIcon />
      <CommentWrite />
      <AddCommentIconWrapper>{!trackClosed ? <AddCommentIcon /> : <ClosedAddCommentIcon />}</AddCommentIconWrapper>
      {trackComments?.map((eachComment: CommentType) => (
        <CommentBox key={eachComment?.commentId} eachComment={eachComment} />
      ))}
    </CommentLayout>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;
`;

const AddCommentIcon = styled(AddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
  cursor: pointer;
`;

const ClosedAddCommentIcon = styled(ClosedAddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const AddCommentIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
