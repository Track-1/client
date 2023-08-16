import styled from "styled-components";
import { CloseCommentsBtnIc } from "../../assets";
import CommentLayout from "./commentLayout";

export default function Comments() {
  return (
    <CommentLayout>
      <CloseCommentsBtnIcon />
    </CommentLayout>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;
`;
