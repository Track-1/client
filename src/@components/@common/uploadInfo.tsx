import styled, { css } from "styled-components";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  UploadFileUpdateIc,
  UploadCategoryIc,
  UploadHashtagIc,
  UploadDescriptionIc,
  FolderUploadIc,
  CategoryDropDownIc,
  AddHashtagIc,
  HashtagWarningIc,
} from "../../assets";

export default function UploadInfo() {
  const descriptionTextarea = useRef<HTMLTextAreaElement | null>(null);
  const descriptionCountarea = useRef<HTMLDivElement | null>(null);
  const enteredHashtag = useRef<HTMLInputElement>(null);

  const [textareaHeight, setTextareaHeight] = useState<String>();
  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [hashtags, setHashtags] = useState<Array<string>>([]);

  const completeHashtag = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && enteredHashtag.current!.value !== "") {
        const value = enteredHashtag.current!.value;
        if (hashtags.includes(value)) {
          alert("중복된 해시태그 입니다!");
        } else {
          setHashtags([...hashtags, value]);
        }
      }
      console.log(hashtags);
    },
    [hashtags],
  );
  console.log(hashtags);

  function resizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextareaHeight(e.target.value);
    setDescriptionLength(e.target.value.length);
  }

  function changeTitleText(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleLength(e.target.value.length);
  }

  // function completeHashtag(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     setHashtags([...hashtags,enteredHashtag.current!.value)]);
  //     console.log(hashtags);
  //   }
  // }
  console.log(hashtags.length);

  useEffect(() => {
    if (descriptionTextarea && descriptionTextarea.current) {
      descriptionTextarea.current.style.height = "0rem";
      const scrollHeight = descriptionTextarea.current.scrollHeight;
      descriptionTextarea.current.style.height = scrollHeight / 10 + "rem";
    }
  }, [textareaHeight]);

  return (
    <Container>
      <TitleInput
        typeof="text"
        placeholder="Please enter a title"
        maxLength={36}
        onChange={changeTitleText}></TitleInput>
      <Line />

      <TextCount font={"body"}>
        <TextWrapper>
          <InputCount>{titleLength}</InputCount>
          <LimitCount>/36</LimitCount>
        </TextWrapper>
      </TextCount>

      <InfoContainer>
        <InfoItemBox>
          <NameBox>
            <UploadFileUpdateIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputFileTextWrapper>
                <InputFileText>Track1</InputFileText>
              </InputFileTextWrapper>
              <FolderUploadIcon />
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadCategoryIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputCategoryTextWrapper>
                <InputCategoryText>Select</InputCategoryText>
              </InputCategoryTextWrapper>
              <CategoryDropDownIcon />
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadHashtagIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputHashtagWrapper>
                {hashtags.length > 0 ? (
                  <>
                    {hashtags.map((item: string, idx) => {
                      return (
                        <Hashtag key={idx}>
                          <HashtagWrapper>
                            <HashtagSharp>{`# ${item}`}</HashtagSharp>
                          </HashtagWrapper>
                        </Hashtag>
                      );
                    })}
                  </>
                ) : (
                  <Hashtag>
                    <HashtagWrapper>
                      <HashtagSharp># </HashtagSharp>
                      <HashtagInput placeholder="Hashtag" onKeyDown={completeHashtag} ref={enteredHashtag} />
                    </HashtagWrapper>
                  </Hashtag>
                )}
              </InputHashtagWrapper>
              <AddHashtagIcon />
            </InputWrapper>
            <HashtagWarningIcon />
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadDescriptionIc />
          </NameBox>
          <InputBox>
            <InputDescriptionText
              typeof="text"
              placeholder="트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요."
              maxLength={250}
              ref={descriptionTextarea}
              onChange={resizeTextarea}></InputDescriptionText>
          </InputBox>
        </InfoItemBox>
      </InfoContainer>

      <TextCount font={"description"} ref={descriptionCountarea}>
        <TextWrapper>
          <InputCount>{descriptionLength}</InputCount>
          <LimitCount>/250</LimitCount>
        </TextWrapper>
      </TextCount>
      {/* <DropDownMenuContainer></DropDownMenuContainer> */}
    </Container>
  );
}

const Container = styled.section`
  height: 74.7rem;
  width: 88.7rem;
`;

const TitleInput = styled.input`
  height: 6.5rem;
  width: 100%;

  font-size: 5rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 13.6rem;
`;

const Line = styled.hr`
  width: 88.2rem;

  border: 1px solid ${({ theme }) => theme.colors.gray5};
  margin-left: 5px;
`;

const TextCount = styled.div<{ font: string }>`
  height: 2.3rem;
  width: 100%;

  ${(props) => {
    if (props.font === "body")
      return css`
        ${({ theme }) => theme.fonts.body1};
        margin-top: 1.8rem;
      `;
    else
      return css`
        ${({ theme }) => theme.fonts.description};
        margin-top: 0.8rem;
      `;
  }}
`;

const TextWrapper = styled.div`
  display: flex;
  float: right;
`;

const InputCount = styled.p`
  color: ${({ theme }) => theme.colors.white};
`;

const LimitCount = styled.p`
  color: ${({ theme }) => theme.colors.gray4};
`;

const InfoContainer = styled.div`
  width: 88.7rem;

  margin-top: 3.9rem;
`;

const InfoItemBox = styled.div`
  height: 6rem;
  width: 100%;

  display: flex;
  margin-bottom: 0.2rem;
`;

const NameBox = styled.div`
  width: 20.7rem;
  height: 100%;

  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
`;
const InputFileTextWrapper = styled.div`
  height: 4.7rem;
  width: 20.8rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const InputFileText = styled.div`
  height: 2.5rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const InputCategoryTextWrapper = styled.div`
  height: 4.7rem;
  width: 9.9rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const InputCategoryText = styled.div`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray3};
  margin-top: 1.4rem;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  margin-top: 1.4rem;
`;

const Hashtag = styled.div`
  height: 3.8rem;
  width: 13.2rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
  margin-right: 1rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.9rem 1.5rem;
`;

const HashtagSharp = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`;

const HashtagInput = styled.input`
${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  ::placeholder{
    color:color: ${({ theme }) => theme.colors.gray3};
  }
`;

const InputDescriptionText = styled.textarea`
  width: 72rem;
  height: 4rem;

  outline: 0;
  resize: none;
  background-color: transparent;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.7rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

// const DropDownMenuContainer = styled.div`
//   height: 36rem;
//   width: 13rem;

//   position: absolute;
//   top: 38.8rem;
//   left: 20.7rem;
//   background: rgba(30, 32, 37, 0.7);
//   backdrop-filter: blur(6.5px);
//   border-radius: 0.5rem;
// `;

const FolderUploadIcon = styled(FolderUploadIc)`
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  margin-top: 0.9rem;
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  margin-left: -0.2rem;
  margin-top: 1.3rem;
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  margin-top: 0.7rem;
`;
