import styled from "styled-components";
import { CloseCommentsBtnIc } from "../../assets";
import useGetComment from "../../hooks/trackPost/useGetComment";
import { CommentType } from "../../type/trackPost/commentType";
import CommentBox from "./commentBox";
import CommentLayout from "./commentLayout";

export default function Comments() {
  const { trackComments } = useGetComment(1);

  return (
    <CommentLayout>
      <CloseCommentsBtnIcon />
      {trackComments?.map((eachComment: CommentType) => (
        <CommentBox key={eachComment?.commentId} eachComment={eachComment} />
      ))}
    </CommentLayout>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;
`;
