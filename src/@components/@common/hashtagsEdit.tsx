import styled from "styled-components";
import React, { KeyboardEvent } from "react";
import { useState } from "react";

import { AddHashtagIc, DeleteHashtagIc, HashtagTitleIc } from "../../assets";
import HashtagWarning from "./hashtagWarning";
import { checkKorean } from "../../utils/common/checkKorean";

export default function HashtagsEdit() {
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [hashtagText, setHashtagText] = useState<string[]>([]);

  function calculateHashtagLength(hashtagValue: string): number {
    const koreanLength = hashtagValue.length * 1.5 + 1;
    const nonKoreanLength = hashtagValue.length * 1.2 + 1;

    return checkKorean(hashtagValue) ? koreanLength : nonKoreanLength;
  }

  function checkHashtagText(e: React.ChangeEvent<HTMLInputElement>) {
    const hashtagValue = e.target.value;
    const hashtagLength = hashtagValue.trim() !== "" ? calculateHashtagLength(hashtagValue) : 0;
    setHashtagLength(hashtagLength);
  }

  function handleEnterHashtag(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    setHashtagText([...hashtagText, value]);
    (e.target as HTMLInputElement).value = "";
    setHashtagLength(0);
  }

  function removeHashtag(index: number) {
    setHashtagText(hashtagText.filter((el, i) => i !== index));
  }

  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitleIcon />
          <HashtagWarning />
        </HashIconWrapper>
        <InputHashtagWrapper>
          {hashtagText.map((tag, index) => (
            <Hashtag>
              <CompleteHashtagWrapper>
                <HashtagSharp># </HashtagSharp>
                <CompletedHashtag>{tag}</CompletedHashtag>
              </CompleteHashtagWrapper>
              <DeleteHashtagIcon onClick={() => removeHashtag(index)} />
            </Hashtag>
          ))}
          <Hashtag>
            <HashtagWrapper>
              <HashtagSharp># </HashtagSharp>
              <HashtagInput
                placeholder="Hashtag"
                onKeyDown={handleEnterHashtag}
                onChange={checkHashtagText}
                inputWidth={hashtagLength}
              />
            </HashtagWrapper>
          </Hashtag>
          <AddHashtagIcon />

          {/* 
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

const HashtagInput = styled.input<{ inputWidth: number }>`
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
