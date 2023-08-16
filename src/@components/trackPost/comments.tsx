import styled from "styled-components";
import { CloseCommentsBtnIc } from "../../assets";
import useGetComment from "../../hooks/trackPost/useGetComment";
import CommentLayout from "./commentLayout";

export default function Comments() {
  const { trackComment } = useGetComment(1);

  console.log(trackComment);

  return (
    <CommentLayout>
      <CloseCommentsBtnIcon />
    </CommentLayout>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;
`;
