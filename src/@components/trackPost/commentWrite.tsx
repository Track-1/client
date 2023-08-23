import styled from "styled-components";
import { CommentIsUpdateProp } from "../../type/trackPost/commentIsUpdateProp";
import CommentContentLength from "./commentContentLength";
import CommentFileInput from "./commentFileInput";
import CommentTextInput from "./commentTextInput";
import CommentWriteLayout from "./commentWriteLayout";

export default function CommentWrite(props: CommentIsUpdateProp) {
  const { isUpdate } = props;

  return (
    <CommentWriteLayout>
      <InputContainer>
        <InputWrapper>
          <CommentFileInput isUpdate={isUpdate} />
          <CommentContentLength isUpdate={isUpdate} />
        </InputWrapper>
        <CommentTextInput isUpdate={isUpdate} />
      </InputContainer>
    </CommentWriteLayout>
  );
}

const InputContainer = styled.section`
  display: flex;
  flex-direction: column;

  margin-left: 11rem;
`;

const InputWrapper = styled.article`
  display: flex;
`;
