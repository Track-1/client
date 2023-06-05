import styled from "styled-components";
import { useState } from "react";

import { AddHashtagIc, DeleteHashtagIc, HashtagTitleIc } from "../../assets";
import HashtagWarning from "./hashtagWarning";

export default function HashtagsEdit() {
  const [isKorean, setIsKorean] = useState<boolean>(false);
  const [hashtagLength, setHashtagLength] = useState<number>(0);

  function checkHashtagText(e: React.ChangeEvent<HTMLInputElement>) {
    let hashtagValue = e.target.value;
    hashtagValue !== "" ? setHashtagLength(hashtagValue.length) : setHashtagLength(0);
  }

  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitleIcon />
          <HashtagWarning />
        </HashIconWrapper>
        <InputHashtagWrapper>
          <Hashtag>
            <HashtagWrapper>
              <HashtagSharp># </HashtagSharp>
              <HashtagInput
                placeholder="Hashtag"
                onChange={checkHashtagText}
                inputWidth={hashtagLength}
              />
            </HashtagWrapper>
          </Hashtag>
          <AddHashtagIcon />
          {/* {hashtags?.map((hashtag, index) => {
            return (
              <Hashtag key={index}>
                <CompleteHashtagWrapper>
                  <HashtagSharp># </HashtagSharp>
                  <CompletedHashtag>{hashtag}</CompletedHashtag>
                </CompleteHashtagWrapper>
                <DeleteHashtagIcon onClick={() => deleteHashtagInput(index)} />
              </Hashtag>
            );
          })}

          {hashtags?.length < 3 && (
            <Hashtag>
              <HashtagWrapper>
                <HashtagSharp># </HashtagSharp>
                <HashtagInput
                  onChange={checkHashtagText}
                  onKeyPress={(e) => {
                    e.key === "Enter" && getHashtagInput();
                  }}
                  inputWidth={hashtagLength}
                  isKorean={isKorean}
                  placeholder="HashTag"
                  maxLength={tagMaxLength}
                  ref={hashtagRef}
                />
              </HashtagWrapper>
            </Hashtag>
          )}

          {hashtags.length < 2 && <AddHashtagIcon onClick={getHashtagInput} />} */}
        </InputHashtagWrapper>
      </HashtagContainer>
    </>
  );
}

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const HashIconWrapper = styled.div`
  display: flex;
`;

const HashtagTitleIcon = styled(HashtagTitleIc)`
  width: 9.3rem;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  height: 10rem;

  align-items: center;
`;

const Hashtag = styled.div`
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

const HashtagInput = styled.input<{ inputWidth: number; isKorean: boolean }>`
  display: flex;

  width: ${({ inputWidth, isKorean }) =>
    inputWidth === 0 ? 9 : isKorean ? inputWidth * 1.5 + 1 : inputWidth * 1.2 + 1}rem;
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

  margin-top: 1rem;

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 2.8rem;

  margin-left: -1rem;

  cursor: pointer;
`;

const CompleteHashtagWrapper = styled.div`
  display: flex;

  padding: 0 1.5rem;

  align-items: center;
`;
