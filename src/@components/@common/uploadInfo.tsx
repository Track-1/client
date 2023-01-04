import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
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
  const description = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState<String>();
  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  function resizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setHeight(e.target.value);
    setDescriptionLength(e.target.value.length);
  }

  function changeTitleText(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleLength(e.target.value.length);
  }


  useEffect(() => {
    if (description && description.current) {
      description.current.style.height = "0rem";
      const scrollHeight = description.current.scrollHeight;
      description.current.style.height = scrollHeight / 10 + "rem";
    }
  }, [height]);

  return (
    <Container>
      <TitleInput placeholder="Please enter a title" maxLength={36} onChange={changeTitleText}></TitleInput>
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
                <Hashtag>
                  <HashtagWrapper>
                    <HashtagSharp># </HashtagSharp>
                    <HashtagInput placeholder="Hashtag" />
                  </HashtagWrapper>
                </Hashtag>
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
              ref={description}
              onChange={resizeTextarea}></InputDescriptionText>
          </InputBox>
        </InfoItemBox>
      </InfoContainer>

      <TextCount font={"description"}>
        <TextWrapper>
          <InputCount>{descriptionLength}</InputCount>
          <LimitCount>/250</LimitCount>
        </TextWrapper>
      </TextCount>
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
  /* background-color: beige; */
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
  margin-left: 1rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
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
  height: 4rem !important;

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

const FolderUploadIcon = styled(FolderUploadIc)`
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  margin-top: 0.9rem;
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  margin-left: 0.8rem;
  margin-top: 1.3rem;
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  margin-top: 0.7rem;
`;
