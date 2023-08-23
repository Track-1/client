import styled from "styled-components";
import CommentFileInput from "./commentFileInput";
import CommentTextInput from "./commentTextInput";
import CommentWriteLayout from "./commentWriteLayout";

export default function CommentWrite() {
  return (
    <CommentWriteLayout>
      <InputWrapper>
        <CommentFileInput />
        <CommentTextInput />
      </InputWrapper>
    </CommentWriteLayout>
  );
}

const InputWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
