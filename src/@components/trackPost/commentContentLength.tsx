import { useRecoilState } from "recoil";
import styled from "styled-components";
import { commentUpdateData, commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentIsUpdateProp } from "../../type/trackPost/commentIsUpdateProp";

export default function CommentContentLength(props: CommentIsUpdateProp) {
  const { isUpdate } = props;
  const [comment, setComment] = useRecoilState(isUpdate ? commentUpdateData : commentWriteData);

  return (
    <CountWrapper>
      <InputCount commentLength={comment?.commentContent?.length}>{comment?.commentContent?.length}</InputCount>
    </CountWrapper>
  );
}

const CountWrapper = styled.div`
  display: flex;

  color: ${({ theme }) => theme.colors.gray3};

  ${({ theme }) => theme.fonts.description}

  margin-left: 54.1rem;
`;

const InputCount = styled.strong<{ commentLength: number }>`
  display: flex;
  justify-content: flex-end;

  width: 10rem;
  margin-left: -10rem;
  margin-right: 2rem;

  ${({ theme }) => theme.fonts.description}

  color: ${({ commentLength, theme }) => (commentLength === 0 ? theme.colors.gray3 : theme.colors.white)};

  &::after {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.colors.gray3};
    content: "/ 150";
  }
`;
