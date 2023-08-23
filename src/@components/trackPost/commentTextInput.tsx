import { useRecoilState } from "recoil";
import styled from "styled-components";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";

export default function CommentTextInput() {
  const [comment, setComment] = useRecoilState(commentWriteData);

  function handelChangeCommentLength(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment({ ...comment, commentContent: e.target.value });
  }

  return (
    <CommentContentWrapper>
      <CommentContentBox
        placeholder="트랙 음악을 다운받아서 보컬 녹음 파일을 업로드해보세요!"
        maxLength={150}
        onChange={handelChangeCommentLength}
        value={comment?.commentContent}
      />
    </CommentContentWrapper>
  );
}

const CommentContentWrapper = styled.div`
  height: 7.9rem;

  margin-top: 1rem;
`;

const CommentContentBox = styled.textarea`
  width: 79rem;

  vertical-align: top;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description}

  overflow: auto;

  background-color: transparent;
  outline: none;
  border: none;
  resize: none;
`;
