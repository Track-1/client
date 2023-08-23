import styled from "styled-components";
import CommentContentLength from "./commentContentLength";
import CommentFileInput from "./commentFileInput";
import CommentTextInput from "./commentTextInput";
import CommentWriteLayout from "./commentWriteLayout";

export default function CommentWrite() {
  return (
    <CommentWriteLayout>
      <InputContainer>
        <InputWrapper>
          <CommentFileInput />
          <CommentContentLength />
        </InputWrapper>
        <CommentTextInput />
      </InputContainer>
    </CommentWriteLayout>
  );
}

const InputContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.article`
  display: flex;
`;
