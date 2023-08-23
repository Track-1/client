import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  AddHashtagIc,
  CategoryDropDownIc,
  CheckCategoryIc,
  DeleteHashtagIc,
  FolderUploadIc,
  HashtagWarningIc,
  HoverHashtagWarningIc,
  UploadCategoryIc,
  UploadDescriptionIc,
  UploadFileUpdateIc,
  UploadHashtagIc,
} from "../../assets";

import { Categories } from "../../core/constants/categories";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";
import { isFocus, isMouseEnter } from "../../utils/common/eventType";
import { isVocal } from "../../utils/common/userType";
import useHover from "../../utils/hooks/useHover";
import { checkMaxInputLength } from "../../utils/uploadPage/maxLength";
// import { isClickedOutside } from "../../utils/common/modal";
import { useParams } from "react-router-dom";
import { checkHashtagLength } from "../../utils/convention/checkHashtagLength";

interface propsType {
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
  whom: string;
}

export default function UploadInfo(props: propsType) {
  const { uploadData, setUploadData, whom } = props;
  const HASHTAG_WIDTH: number = 8.827;

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const introduceRef = useRef<HTMLTextAreaElement | null>(null);
  const categoryRefs = useRef<HTMLLIElement[] | null[]>([]);
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const hashtagDeleteRef = useRef<SVGSVGElement | null>(null);
  const { hoverState, changeHoverState } = useHover();

  const [checkState, setCheckState] = useState<boolean[]>([]);
  const [checkHoverState, setCheckHoverState] = useState<boolean[]>([]);
  const [checkStateIcon, setCheckStateIcon] = useState<boolean[]>([]);

  const [hiddenDropBox, setHiddenDropBox] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<boolean>(false);
  const [audioType, setAudioType] = useState<string>("");

  const [descriptionHoverState, setDescriptionHoverState] = useState<boolean>(false);
  const [titleHoverState, setTitleHoverState] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState<String>("33");
  const [textareaMargin, setTextareaMargin] = useState<number>(33.8);
  const [hashtagInputWidth, setHashtagInputWidth] = useState<number>(HASHTAG_WIDTH);
  const [hashtagLength, setHashtagLength] = useState<number>(0);

  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const keepKeyCodes = [8, 37, 38, 39, 40];

  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState<string>("");
  const [tagMaxLength, setTagMaxLength] = useState<number>(10);
  const [isKorean, setIsKorean] = useState<boolean>(false);

  const { producerUploadType } = useParams();

  useEffect(() => {
    setUploadData((prevState) => {
      return { ...prevState, keyword: hashtags };
    });
  }, [hashtags]);

  useEffect(() => {
    if (introduceRef && introduceRef.current) {
      introduceRef.current.style.height = 0 + "rem";
      const scrollHeight = introduceRef.current.scrollHeight;
      changeIntroduceInputHeight(scrollHeight);
      setTextareaMargin(scrollHeight);
    }
  }, [textareaHeight]);

  useEffect(() => {
    const initArray = getInitFalseArray();
    initArrayState(initArray);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  useEffect(() => {
    setHashtags(uploadData.keyword);
    isVocal(whom)
      ? setDescriptionPlaceholder("보컬 느낌과 작업 목표 등 보컬에 대해서 자세히 설명해주세요.")
      : producerUploadType !== "Vocal Searching"
      ? setDescriptionPlaceholder("트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요.")
      : setDescriptionPlaceholder("어떤 주제의 곡인가요? 작업 목표와 계획은 어떻게 되나요?");
  }, []);

  function clickOutSide(e: any) {
    if (
      !hashtagRef.current?.contains(e.target) &&
      !hashtagDeleteRef.current?.contains(e.target) &&
      hashtagRef.current?.value
    ) {
      completeHashtag();
    }
  }

  function getInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtagInput(e.target.value);
    setHashtagLength(e.target.value.length);
    e.target.value !== "" ? setHashtagLength(e.target.value.length) : setHashtagLength(0);

    if (checkHashtagLength(e.target.value)) {
      setIsKorean(true);
      e.target.value.length > 10 &&
        alert("Hashtags can contain up to 10 characters.\n해시태그는 10자까지 작성할 수 있습니다.");
    } else {
      setIsKorean(false);
    }
  }

  function completeHashtag() {
    if (hashtagRef.current && !isDuplicateHashtag(hashtagInput)) {
      console.log("hear!!");
      console.log(hashtagInput);
      hashtagRef.current.value = "";
      setHashtags((prev) => [...prev, hashtagInput]);
      setHashtagInput("");
      setHashtagLength(0);
    }
  }

  function deleteHashtag(index: number) {
    const deleteTag = hashtags;
    deleteTag.splice(index, 1);
    setHashtags([...deleteTag]);
    // setHashtagInput("");
  }

  function getInitFalseArray(): boolean[] {
    const initArray: boolean[] = [];
    Object.values(Categories).forEach(() => {
      initArray.push(false);
    });
    return initArray;
  }

  function initArrayState(initArray: boolean[]): void {
    setCheckState(initArray);
    setCheckHoverState(initArray);
    setCheckStateIcon(initArray);
  }

  //타이틀
  function changeTitleText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputLength = e.target.value.length;

    if (inputLength > 28) {
      alert("A title can contain up to 28 characters.\n제목은 28자까지 작성할 수 있습니다.");
    }
    if (checkMaxInputLength(inputLength, 28)) {
      setTitleLength(inputLength);
      setUploadData((prevState) => {
        return { ...prevState, title: e.target.value };
      });
    } else {
      restrictInput(titleRef);
    }
  }

  function hoverTitle(e: React.FocusEvent<HTMLTextAreaElement>) {
    if (isFocus(e)) {
      setTitleHoverState(true);
    } else {
      isTitleEmpty() ? setTitleHoverState(false) : setTitleHoverState(true);
    }
  }

  function isTitleEmpty(): boolean {
    return titleRef.current!.value.length === 0;
  }

  function showDropBox(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    e.stopPropagation();
    setHiddenDropBox((prev) => !prev);
  }

  //오디오 업로드
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const file = e.target.value;
      const inputAudioFile = e.target!.files[0];
      const audioFileName: string = getAudioFileName(file);
      const audioFileType: string = getAudioFileType(file, audioFileName.length);
      const onlyFileName: string = getOnlyFileName(file);

      if (checkAduioFileType(audioFileType)) {
        setAudioAttribute(audioFileName, audioFileType, onlyFileName);
        setUploadData((prevState) => {
          return { ...prevState, audioFile: inputAudioFile };
        });
      } else {
        alert("Only wav, mp3 format audio can be uploaded.\nwav, mp3형식의 오디오만 업로드할 수 있습니다.");
      }
    }
  }

  function checkAduioFileType(type: string) {
    return type === ".mp3" || type === ".wav" || type === ".MP3" || type === ".WAV";
  }

  function getAudioFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1);
  }

  function getAudioFileType(file: string, fileLength: number): string {
    return file.substring(file.lastIndexOf("\\") + 1).substring(fileLength - 4);
  }

  function getOnlyFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1, file.length - 4);
  }

  function setAudioAttribute(name: string, type: string, editName: string) {
    if (checkMaxInputLength(editName.length, 13)) {
      setIsTextOverflow(false);
      setFileName(name);
    } else {
      setIsTextOverflow(true);
      setFileName(editName);
    }
    setAudioType(type);
  }

  // 카테고리
  function selectedCategory(e: React.MouseEvent<HTMLLIElement>, index: number) {
    const temp = getInitFalseArray();

    temp[index] = true;
    setCheckState([...temp]);
    setCheckStateIcon([...temp]);
    setCategoryState(true);
    setHiddenDropBox(true);
    setUploadData((prevState) => {
      return { ...prevState, category: e.currentTarget.innerText };
    });
  }

  function hoverCategoryMenu(e: React.MouseEvent<HTMLLIElement>, index: number) {
    const hoverMenu = getInitFalseArray();

    if (isMouseEnter(e)) {
      hoverMenu[index] = true;
      setCheckHoverState([...hoverMenu]);
    } else {
      setCheckHoverState([...hoverMenu]);
    }
  }

  function isDuplicateHashtag(value: string): boolean {
    const isDuplicate = uploadData.keyword.includes(value);
    isDuplicate && alert("중복된 해시태그 입니다!");
    return isDuplicate;
  }

  function restrictInput(ref: any): void {
    ref.current!.value = ref.current!.value.slice(0, -1);
  }

  //소개글
  function resizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length > 250) {
      alert("Description can contain up to 250 characters.\n설명은 250자까지 작성할 수 있습니다.");
    }

    const enterCount = e.target.value.split("\n").length;
    const inputLength = e.target.value.length;
    const currentHeight = introduceRef.current!.scrollHeight;

    setUploadData((prevState) => {
      return { ...prevState, content: e.target.value };
    });

    if (
      checkMaxInputLength(enterCount, 7) &&
      checkMaxInputLength(currentHeight, 200) &&
      checkMaxInputLength(inputLength, 250)
    ) {
      setTextareaHeight(e.target.value);
      setDescriptionLength(inputLength);
    } else {
      restrictInput(introduceRef);
    }
  }

  function hoverDescription(e: React.FocusEvent<HTMLTextAreaElement>) {
    const inputLength = e.target.value.length;

    if (isFocus(e)) {
      setDescriptionHoverState(true);
    } else {
      inputLength === 0 ? setDescriptionHoverState(false) : setDescriptionHoverState(true);
    }
  }

  function changeIntroduceInputHeight(scrollHeight: number): void {
    introduceRef.current!.style.height = scrollHeight / 10 + "rem";
  }

  function keepHeight(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (introduceRef.current && introduceRef.current.scrollHeight >= 159) {
      if (!keepKeyCodes.includes(event.keyCode)) {
        event.preventDefault();
      }
    }
  }

  return (
    <Container onClick={() => setHiddenDropBox(true)}>
      <TitleText
        typeof="text"
        placeholder="Please enter a title"
        spellCheck={false}
        maxLength={28}
        onFocus={hoverTitle}
        onBlur={hoverTitle}
        ref={titleRef}
        onChange={changeTitleText}
        row={titleLength < 18 ? 4.5 : Math.floor(titleLength / 17) + 6.5}></TitleText>

      <Line titleLength={titleLength} titleHoverState={titleHoverState} />

      <TextCount font={"body"} textareaMargin={textareaMargin}>
        <TextWrapper>
          <InputCount>{titleLength}</InputCount>
          <LimitCount>/28</LimitCount>
        </TextWrapper>
      </TextCount>

      <InfoContainer>
        <InfoItemBox>
          <NameBox>
            <UploadFileUpdateIcon />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputFileTextWrapper fileName={fileName}>
                <FileName value={fileName} isTextOverflow={isTextOverflow} disabled />
                {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioType}</FileAttribute>}
                <input
                  type="file"
                  id="wavFileUpload"
                  style={{ display: "none" }}
                  accept=".wav,.mp3, .WAV, .MP3"
                  onChange={uploadAudiofile}
                  readOnly
                />
              </InputFileTextWrapper>
              <label htmlFor="wavFileUpload" style={{ cursor: "pointer" }}>
                <FolderUploadIcon />
              </label>
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadCategoryIcon />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputCategoryTextWrapper categoryState={categoryState}>
                <InputCategoryText categoryState={categoryState} onClick={showDropBox} ref={categoryRef}>
                  {uploadData.category}
                </InputCategoryText>
              </InputCategoryTextWrapper>
              <CategoryDropDownIcon onClick={showDropBox} />
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <HashTagInfoItemBox>
          <NameBox>
            <UploadHashtagIcon />
          </NameBox>
          <InputBox>
            <InputHashtagWrapper>
              {hashtags.map((hashtag, index) => {
                return (
                  <Hashtag key={index}>
                    <CompleteHashtagWrapper>
                      <HashtagSharp># </HashtagSharp>
                      <CompletedHashtag>{hashtag}</CompletedHashtag>
                    </CompleteHashtagWrapper>
                    <DeleteHashtagIcon onClick={() => deleteHashtag(index)} ref={hashtagDeleteRef} />
                  </Hashtag>
                );
              })}
              {hashtags.length < 3 && (
                <Hashtag>
                  <HashtagWrapper>
                    <HashtagSharp># </HashtagSharp>
                    <HashtagInput
                      onChange={getInputText}
                      onKeyPress={(e) => {
                        e.key === "Enter" && completeHashtag();
                      }}
                      inputWidth={hashtagLength}
                      isKorean={isKorean}
                      ref={hashtagRef}
                      placeholder="HashTag"
                      maxLength={tagMaxLength}
                    />
                  </HashtagWrapper>
                </Hashtag>
              )}

              {hashtags.length < 2 && <AddHashtagIcon onClick={completeHashtag} />}
            </InputHashtagWrapper>

            <WarningIcon onMouseEnter={(e) => changeHoverState(e)} onMouseLeave={(e) => changeHoverState(e)}>
              {hoverState ? (
                <>
                  <HoverHashtagWarningIcon />
                  <WarningTextWrapper isVocal={isVocal(whom)}>
                    <WarningText>
                      1. 해시태그는 최대 3개까지 추가 가능합니다.
                      <br />
                      2. 최대 10자까지 작성이 가능합니다.
                      <br />
                      3. 트랙의 분위기에 대해 설명해주세요. (ex. tropical, dynamic)
                    </WarningText>
                  </WarningTextWrapper>
                </>
              ) : (
                <HashtagWarningIcon />
              )}
            </WarningIcon>
          </InputBox>
        </HashTagInfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadDescriptionIcon />
          </NameBox>
          <InputBox>
            <InputDescriptionText
              typeof="text"
              placeholder={descriptionPlaceholder}
              spellCheck={false}
              maxLength={250}
              onFocus={hoverDescription}
              onBlur={hoverDescription}
              descriptionHoverState={descriptionHoverState}
              ref={introduceRef}
              onChange={resizeTextarea}
              row={Math.floor(descriptionLength / 30) + 1}
              onKeyDown={keepHeight}></InputDescriptionText>
          </InputBox>
        </InfoItemBox>
      </InfoContainer>
      <TextCount font={"description"} textareaMargin={textareaMargin}>
        <TextWrapper>
          <InputCount>{descriptionLength}</InputCount>
          <LimitCount>/250</LimitCount>
        </TextWrapper>
      </TextCount>
      <DropMenuBox hiddenDropBox={hiddenDropBox} isVocal={isVocal(whom)}>
        <DropMenuWrapper>
          {Object.values(Categories).map((text: string, index: number) => (
            <DropMenuItem
              checkState={checkState[index]}
              checkHoverState={checkHoverState[index]}
              onMouseEnter={(e) => hoverCategoryMenu(e, index)}
              onMouseLeave={(e) => hoverCategoryMenu(e, index)}
              onClick={(e) => selectedCategory(e, index)}
              ref={(element) => {
                categoryRefs.current[index] = element;
              }}>
              <DropMenuText>{text}</DropMenuText>
              {checkStateIcon[index] && <CheckCategoryIcon />}
            </DropMenuItem>
          ))}
        </DropMenuWrapper>
      </DropMenuBox>
    </Container>
  );
}

const Container = styled.section`
  height: 74.6rem;
  width: 88.7rem;
  margin-top: -2.5rem;
`;

const TitleText = styled.textarea<{ row: number }>`
  width: 100%;
  height: ${({ row }) => (row < 1 ? 6.5 : row * 2 - 2)}rem;

  font-size: 5rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ row }) => (row === 4.5 ? 13.6 : 7.6)}rem;

  outline: 0;
  resize: none;
  overflow: hidden;
  background-color: transparent;

  border: none;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`;

const Line = styled.hr<{ titleLength: number; titleHoverState: boolean }>`
  width: 88.2rem;

  border: 1px solid
    ${(props) =>
      props.titleLength !== 0 || props.titleHoverState
        ? ({ theme }) => theme.colors.white
        : ({ theme }) => theme.colors.gray5};
  margin-left: 5px;
`;

const TextCount = styled.div<{ font: string; textareaMargin: number }>`
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
        margin-top: ${props.textareaMargin / 10 - 4.3 + 0.8}rem;
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

const HashTagInfoItemBox = styled.div`
  height: 9rem;
  width: 100%;

  display: flex;
  margin-bottom: 0.2rem;
`;

const NameBox = styled.div`
  width: 30rem;

  display: flex;
  justify-content: flex-start;
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

const FileName = styled.input<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "16.4rem" : "100%")};

  display: flex;
  align-items: center;

  text-overflow: ${(props) => (props.isTextOverflow ? "ellipsis" : "default")};

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
  cursor: default;
`;

const FileAttribute = styled.div<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "100%" : 0)};
  width: 100%;

  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const InputFileTextWrapper = styled.div<{ fileName: string }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid
    ${(props) => (props.fileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryTextWrapper = styled.div<{ categoryState: boolean }>`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 0.1rem solid
    ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryText = styled.div<{ categoryState: boolean }>`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  margin-top: 1.5rem;
  cursor: pointer;
`;

const InputDescriptionText = styled.textarea<{ descriptionHoverState: boolean; row: number }>`
  width: 68rem;
  outline: 0;
  resize: none;
  overflow: hidden;
  background-color: transparent;

  border: none;
  border-bottom: 0.1rem solid
    ${(props) => (props.descriptionHoverState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.7rem;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  height: ${({ row }) => row * 3.4 + 1}rem;
  padding-bottom: 1rem;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
`;

const WarningTextWrapper = styled.div<{ isVocal: boolean }>`
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  top: ${({ isVocal }) => (isVocal ? 47 : 61)}rem;
  left: ${({ isVocal }) => (isVocal ? 116 : 129)}rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.3rem);
  border-radius: 5px;
  margin-top: 1rem;
`;

const WarningText = styled.div`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin: 1.9rem 1.8rem 0.4rem 2.9rem;
`;

const DropMenuBox = styled.div<{ hiddenDropBox: boolean; isVocal: boolean }>`
  display: ${(props) => (props.hiddenDropBox ? "none" : "default")};
  width: 13rem;

  position: absolute;
  top: ${({ isVocal }) => (isVocal ? 41 : 54)}rem;
  left: ${({ isVocal }) => (isVocal ? 96.5 : 109)}rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.65rem);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li<{ checkState: boolean; checkHoverState: boolean }>`
  height: 3.2rem;
  width: 9.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) =>
    props.checkState || props.checkHoverState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3};
  margin: 0 1.9rem;
  cursor: pointer;
`;

const DropMenuText = styled.p`
  height: 2rem;
`;

const WarningIcon = styled.div`
  width: 4rem;
  height: 4rem;
  height: 3rem;
  margin-top: 2.3rem;
  border-radius: 5rem;

  cursor: pointer;
`;

const FolderUploadIcon = styled(FolderUploadIc)`
  width: 4rem;
  height: 4rem;
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  width: 4rem;
  height: 4rem;
  margin-top: 0.9rem;
  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  margin-right: 0.5rem;
  cursor: pointer;
`;

const UploadFileUpdateIcon = styled(UploadFileUpdateIc)`
  width: 13.3rem;
`;

const UploadCategoryIcon = styled(UploadCategoryIc)`
  width: 12.3rem;
`;

const UploadHashtagIcon = styled(UploadHashtagIc)`
  width: 11.2rem;
`;

const UploadDescriptionIcon = styled(UploadDescriptionIc)`
  width: 14.6rem;
  margin-right: 7.5rem;
`;

const HoverHashtagWarningIcon = styled(HoverHashtagWarningIc)`
  width: 4rem;
  height: 4rem;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 9rem;
`;

const Hashtag = styled.div`
  display: flex;
  align-items: center;
  height: 3.8rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
  padding-right: 1rem;
  margin: 0.5rem 1rem 0.5rem 0;
`;

const HashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.5rem 0 1.5rem;
`;

const CompleteHashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;

const HashtagSharp = styled.p`
  margin-right: 0.5rem;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
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
  margin-top: -0.5rem;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 21rem;
  display: flex;
  justify-content: flex-start;
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  width: 4rem;
  height: 4rem;
`;

const CheckCategoryIcon = styled(CheckCategoryIc)`
  width: 1.5rem;
  height: 0.9rem;
`;
