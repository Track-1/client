import styled from "styled-components";
import { AddHashtagIc, DeleteHashtagIc } from "../../../assets";

interface HashtagInputProps {
  hashtags: string[];
  hashtagLength: number;
  hashtagInputText: string;
  handleEnterHashtag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddHashtag: () => void;
  handleRemoveHashtag: (tag: string) => void;
  handleChangeHashtagInputText: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function HashtagInput(props: HashtagInputProps) {
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = props;

  return (
    <>
      {hashtags.map((tag, index) => (
        <HashtagBox key={tag}>
          <CompleteHashtagWrapper>
            <HashtagSharp># </HashtagSharp>
            <CompletedHashtag>{tag}</CompletedHashtag>
          </CompleteHashtagWrapper>
          <DeleteHashtagIcon onClick={() => handleRemoveHashtag(tag)} />
        </HashtagBox>
      ))}
      {hashtags?.length < 3 && (
        <HashtagBox>
          <HashtagWrapper>
            <HashtagSharp># </HashtagSharp>
            <HashtagInputText
              placeholder="Hashtag"
              onKeyDown={handleEnterHashtag}
              onChange={handleChangeHashtagInputText}
              onBlur={handleAddHashtag}
              inputWidth={hashtagLength}
              value={hashtagInputText}
            />
          </HashtagWrapper>
        </HashtagBox>
      )}
      {hashtags?.length < 2 && <AddHashtagIcon onClick={handleAddHashtag} />}
    </>
  );
}

const HashtagBox = styled.div`
  display: flex;

  height: 3.8rem;

  padding-right: 1rem;
  margin-right: 1rem;

  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};

  align-items: center;
`;

const HashtagWrapper = styled.div`
  display: flex;

  padding: 0 0.5rem 0 1.5rem;

  align-items: center;
`;

const HashtagSharp = styled.p`
  margin-right: 0.5rem;

  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.hashtag};
`;

const HashtagInputText = styled.input<{ inputWidth: number }>`
  display: flex;

  width: ${({ inputWidth }) => (inputWidth === 0 ? 9 : inputWidth)}rem;
  ${({ theme }) => theme.fonts.hashtag};

  color: ${({ theme }) => theme.colors.gray1};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const CompletedHashtag = styled.article`
  display: flex;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.hashtag}
  align-items: center;
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 4rem;
  height: 4rem;

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 2.8rem;

  margin-left: -1rem;

  cursor: pointer;
`;

const CompleteHashtagWrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 0 1.5rem;
`;
