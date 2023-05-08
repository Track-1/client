import styled from "styled-components";
import {
  AddHashtagIc,
  DeleteHashtagIc,
  HashtagTitleIc,
} from "../../assets";
import HashtagWarning from "./hashtagWarning";

export default function HashtagsEdit() {
  return (
    <>
      프로필 해시태그 title + input창
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitleIcon />
          <HashtagWarning />
        </HashIconWrapper>
        <InputHashtagWrapper>
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
  align-items: center;

  height: 10rem;
`;

const Hashtag = styled.div`
  display: flex;
  align-items: center;
  height: 3.8rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1.5rem;
`;

const HashtagSharp = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-right: 0.5rem;
`;

const HashtagInput = styled.input<{ inputWidth: number; isKorean: boolean }>`
  width: ${({ inputWidth, isKorean }) =>
    inputWidth === 0 ? 9 : isKorean ? inputWidth * 1.5 + 1 : inputWidth * 1.2 + 1}rem;
  display: flex;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const CompletedHashtag = styled.article`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag}
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
  align-items: center;
  padding: 0 1.5rem;
`;
