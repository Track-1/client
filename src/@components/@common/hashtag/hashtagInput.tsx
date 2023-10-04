import styled from "styled-components";
import { AddHashtagIc, DeleteHashtagIc } from "../../../assets";
import { KeyboardEvent } from "react";

interface HashtagInputProps {
  hashtags: string[];
  hashtagLength: number;
  hashtagInputText: string;
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
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = props;

  function handleEnterHashtag(e: KeyboardEvent<HTMLInputElement>) {
    console.log("hello");

    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      handleAddHashtag();
    }
  }

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
              onKeyDownCapture={handleEnterHashtag}
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
  align-items: center;

  height: 3.8rem;

  padding-right: 1rem;
  margin-right: 1rem;

  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const HashtagWrapper = styled.div`
  display: flex;

  padding: 0 0.5rem 0 1.5rem;
`;

const HashtagSharp = styled.p`
  margin-right: 0.5rem;

  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.hashtag};
`;

const HashtagInputText = styled.input<{ inputWidth: number }>`
  display: flex;

  width: ${({ inputWidth }) => (inputWidth === 0 ? 9 : inputWidth * 1.5 + 1)}rem;
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
  width: 3.8rem;
  height: 3.8rem;

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
