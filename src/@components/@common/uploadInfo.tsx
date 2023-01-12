import React from "react";
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
  HoverHashtagWarningIc,
  DeleteHashtagIc,
  CheckCategoryIc,
} from "../../assets";
import { useRecoilState } from "recoil";
import { uploadTitle, uploadCategory, uploadIntroduce, uploadKeyword, uploadWavFile } from "../../recoil/upload";

export default function UploadInfo() {
  const descriptionTextarea = useRef<HTMLTextAreaElement | null>(null);
  const dropBoxRef = useRef<HTMLDivElement>(null);
  let enteredHashtag = useRef<HTMLInputElement | null>(null);
  let categoryRefs = useRef<HTMLLIElement[] | null[]>([]);

  const [category, setCategory] = useState<string[]>([
    "R&B",
    "Hiphop",
    "Ballad",
    "Pop",
    "Rock",
    "EDM",
    "Jazz",
    "House",
    "Funk",
  ]);

  const [checkState, setCheckState] = useState<Array<boolean>>(new Array(category.length).fill(false));
  const [checkHoverState, setCheckHoverState] = useState<Array<boolean>>(new Array(category.length).fill(false));
  const [checkStateIcon, setCheckStateIcon] = useState<Array<boolean>>(new Array(category.length).fill(false));

  const [title, setTitle] = useRecoilState<string>(uploadTitle);
  const [description, setDeiscription] = useRecoilState<string>(uploadIntroduce);
  const [genre, setGenre] = useRecoilState<string>(uploadCategory);
  const [hashtags, setHashtags] = useRecoilState<Array<string>>(uploadKeyword);
  const [wavFile, setWavFile] = useRecoilState<File | null>(uploadWavFile);

  const [hiddenDropBox, setHiddenDropBox] = useState<boolean>(true);
  const [editFileName, setEditFileName] = useState<string>("");
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<boolean>(false);
  const [audioType, setAudioType] = useState<string>("");

  const [titleHoverState, setTitleHoverState] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState<String>("33");
  const [textareaMargin, setTextareaMargin] = useState<number>(33.8);
  const [hashtagInputWidth, setHashtagInputWidth] = useState<number>(8.827);
  const [hashtagLength, setHashtagLength] = useState<number>(0);

  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  const [warningHoverState, setWarningHoverState] = useState<boolean>(false);

  function closeDropBox(e: React.MouseEvent<HTMLDivElement>) {
    // console.dir(dropBoxRef.current);
  }

  function showDropBox(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    setHiddenDropBox((prev) => !prev);
  }

  function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const uploadName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
    uploadName.substring(uploadName.length - 4) === ".wav" ? setAudioType(".wav") : setAudioType(".mp3");
    let str = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1, e.target.value.length - 4);

    if (str.length > 14) {
      setIsTextOverflow(true);
      setEditFileName(str);
    } else {
      setIsTextOverflow(false);
      setEditFileName(uploadName);
    }

    if (e.target.files !== null) {
      setWavFile(e.target.files[0]);
    }
  }

  function selectCategory(e: React.MouseEvent<HTMLLIElement>) {
    const index = category.indexOf(e.currentTarget.innerText);
    setGenre(e.currentTarget.innerText);

    const temp = new Array(category.length).fill(false);
    temp[index] = true;
    setCheckState([...temp]);
    setCheckStateIcon([...temp]);
    setCategoryState(true);
    setHiddenDropBox(true);
  }

  function hoverMenu(e: React.MouseEvent<HTMLLIElement>) {
    const index = category.indexOf(e.currentTarget.innerText);
    if (e.type === "mouseenter") {
      const temp = new Array(category.length).fill(false);
      temp[index] = true;
      setCheckHoverState([...temp]);
    } else {
      const temp = new Array(category.length).fill(false);
      setCheckHoverState([...temp]);
    }
  }

  function hoverWarningState(e: React.MouseEvent<HTMLInputElement>) {
    e.type === "mouseenter" ? setWarningHoverState(true) : setWarningHoverState(false);
  }

  function hoverTitle(e: React.FocusEvent<HTMLInputElement>) {
    e.type === "focus"
      ? setTitleHoverState(true)
      : titleLength === 0
      ? setTitleHoverState(false)
      : setTitleHoverState(true);
  }

  function addHastag() {
    const value = enteredHashtag.current!.value;
    hashtags.includes(value) ? alert("중복된 해시태그 입니다!") : setHashtags([...hashtags, value]);
    enteredHashtag.current!.value = "";
  }

  function addHashtagInput(e: React.MouseEvent<HTMLInputElement>) {
    if (hashtags.length < 3) {
      addHastag();
      enteredHashtag.current!.value = "";
    }
  }

  function completeHashtag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addHastag();
      enteredHashtag.current!.value = "";
    }
  }

  function resizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = e.target.value.split("\n").length;

    if (enterCount < 8 && descriptionTextarea.current!.scrollHeight <= 200) {
      setTextareaHeight(e.target.value);
      setDescriptionLength(e.target.value.length);
      setDeiscription(descriptionTextarea.current!.value);
    } else {
      descriptionTextarea.current!.value = descriptionTextarea.current!.value.slice(0, -1);
    }
  }

  function changeTitleText(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleLength(e.target.value.length);
    setTitle(e.target.value);
  }

  function changeHashtagText(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value.length;

    if (inputValue <= 10) {
      setHashtagLength(e.target.value.length);
      setHashtagInputWidth(Number(e.target.value));
    } else {
      enteredHashtag.current!.value = enteredHashtag.current!.value.slice(0, -1);
    }
    setHashtagLength(e.target.value.length);
    setHashtagInputWidth(Number(e.target.value));
  }

  function deleteHashtag(item: string) {
    setHashtags(hashtags.filter((hashtag) => hashtag !== item));
    setHashtagInputWidth(8.827);
  }

  useEffect(() => {
    if (descriptionTextarea && descriptionTextarea.current) {
      descriptionTextarea.current.style.height = "0rem";
      const scrollHeight = descriptionTextarea.current.scrollHeight;
      descriptionTextarea.current.style.height = scrollHeight / 10 + "rem";
      setTextareaMargin(scrollHeight);
    }
  }, [textareaHeight]);

  //존나빠르게 치면 이슈생김...
  useEffect(() => {
    if (hashtags.length < 3) {
      if (enteredHashtag.current!.value.length > 0) {
        if (enteredHashtag && enteredHashtag.current) {
          enteredHashtag.current.style.width = "0rem";
          const inputWidth = enteredHashtag.current.scrollWidth;
          console.log(inputWidth);
          enteredHashtag.current.style.width = inputWidth / 10 + "rem";
          setHashtagInputWidth(inputWidth);
        }
      } else {
        enteredHashtag.current!.style.width = "8.827rem";
        setHashtagInputWidth(8.827);
      }
    }
  }, [hashtagInputWidth]);

  useEffect(() => {
    function clickOutside(e: any) {
      if (!hiddenDropBox && !dropBoxRef.current!.contains(e.target)) {
        setHiddenDropBox((prev) => prev);
      }
    }
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [hiddenDropBox]);

  return (
    <Container>
      <TitleInput
        typeof="text"
        placeholder="Please enter a title"
        spellCheck={false}
        maxLength={36}
        onChange={changeTitleText}
        onFocus={hoverTitle}
        onBlur={hoverTitle}></TitleInput>
      <Line titleLength={titleLength} titleHoverState={titleHoverState} />

      <TextCount font={"body"} textareaMargin={textareaMargin}>
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
              <InputFileTextWrapper editFileName={editFileName}>
                <FileName value={editFileName} isTextOverflow={isTextOverflow} disabled />
                {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioType}</FileAttribute>}
                <input
                  type="file"
                  id="wavFileUpload"
                  style={{ display: "none" }}
                  accept=".wav,.mp3"
                  onChange={uploadFile}
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
            <UploadCategoryIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputCategoryTextWrapper categoryState={categoryState}>
                <InputCategoryText categoryState={categoryState} onClick={showDropBox}>
                  {categoryState ? `${genre}` : "Select"}
                </InputCategoryText>
              </InputCategoryTextWrapper>
              <CategoryDropDownIcon onClick={showDropBox} />
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadHashtagIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              {hashtags.length > 0 ? (
                <>
                  {hashtags.map((item: string, idx: number) => {
                    return (
                      <InputHashtagWrapper>
                        <Hashtag key={idx}>
                          <HashtagWrapper>
                            <HashtagSharp>{`# ${item}`}</HashtagSharp>
                            <DeleteHashtagIcon onClick={() => deleteHashtag(item)} />
                          </HashtagWrapper>
                        </Hashtag>
                      </InputHashtagWrapper>
                    );
                  })}
                  {hashtags.length < 3 && (
                    <InputHashtagWrapper>
                      <Hashtag>
                        <HashtagWrapper>
                          <HashtagSharp># </HashtagSharp>
                          <HashtagInput
                            placeholder="Hashtag"
                            type="text"
                            defaultValue=""
                            onKeyDown={completeHashtag}
                            onChange={changeHashtagText}
                            hashtagInputWidth={hashtagInputWidth}
                            maxLength={10}
                            ref={enteredHashtag}
                          />

                          <div style={{ width: "1" }}></div>
                        </HashtagWrapper>
                      </Hashtag>
                    </InputHashtagWrapper>
                  )}
                </>
              ) : (
                <InputHashtagWrapper>
                  <Hashtag>
                    <HashtagWrapper>
                      <HashtagSharp># </HashtagSharp>
                      <HashtagInput
                        placeholder="Hashtag"
                        onKeyDown={completeHashtag}
                        onChange={changeHashtagText}
                        hashtagInputWidth={hashtagInputWidth}
                        maxLength={10}
                        ref={enteredHashtag}
                      />
                    </HashtagWrapper>
                  </Hashtag>
                </InputHashtagWrapper>
              )}
              {hashtagLength > 0 && hashtags.length < 2 && (
                <AddHashtagIconWrapper onClick={addHashtagInput}>
                  <AddHashtagIcon />
                </AddHashtagIconWrapper>
              )}
            </InputWrapper>

            <WarningIcon onMouseEnter={hoverWarningState} onMouseLeave={hoverWarningState}>
              {warningHoverState ? (
                <>
                  <HoverHashtagWarningIc />
                  <WarningTextWrapper>
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
                <HashtagWarningIc />
              )}
            </WarningIcon>
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
              spellCheck={false}
              maxLength={250}
              ref={descriptionTextarea}
              onChange={resizeTextarea}></InputDescriptionText>
          </InputBox>
        </InfoItemBox>
      </InfoContainer>
      <TextCount font={"description"} textareaMargin={textareaMargin}>
        <TextWrapper>
          <InputCount>{descriptionLength}</InputCount>
          <LimitCount>/250</LimitCount>
        </TextWrapper>
      </TextCount>
      <DropMenuBox hiddenDropBox={hiddenDropBox} onClick={closeDropBox} ref={dropBoxRef}>
        <DropMenuWrapper>
          {category.map((text: string, index: number) => (
            <DropMenuItem
              checkState={checkState[index]}
              checkHoverState={checkHoverState[index]}
              onMouseEnter={hoverMenu}
              onMouseLeave={hoverMenu}
              onClick={selectCategory}
              ref={(element) => {
                categoryRefs.current[index] = element;
              }}>
              <DropMenuText>{text}</DropMenuText>
              {checkStateIcon[index] && <CheckCategoryIc />}
            </DropMenuItem>
          ))}
        </DropMenuWrapper>
      </DropMenuBox>
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
        margin-top: ${props.textareaMargin / 10 - 3.3 + 0.8}rem;
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
  /* width: ${(props) => (props.isTextOverflow ? "100%" : 0)}; */
  width: 100%;

  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const InputFileTextWrapper = styled.div<{ editFileName: string }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.editFileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryTextWrapper = styled.div<{ categoryState: boolean }>`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 1px solid
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

const InputHashtagWrapper = styled.div`
  display: flex;
  margin-top: 1.4rem;
`;

const Hashtag = styled.div`
  height: 3.8rem;

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

const HashtagInput = styled.input<{ hashtagInputWidth: number }>`
  width: ${(props) => props.hashtagInputWidth}rem;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  margin-right: 0.5rem;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const AddHashtagIconWrapper = styled.div`
  height: 4rem;
  width: 4rem;

  cursor: pointer;
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

const WarningTextWrapper = styled.div`
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  top: 61.2rem;
  left: 128.4rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 5px;
`;

const WarningText = styled.div`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin: 1.9rem 1.8rem 0.4rem 2.9rem;
`;

const DropMenuBox = styled.div<{ hiddenDropBox: boolean }>`
  display: ${(props) => (props.hiddenDropBox ? "none" : "default")};
  width: 13rem;

  position: absolute;
  top: 54.4rem;
  left: 103.7rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(6.5px);
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
  height: 3rem;
  margin-top: 0.7rem;
  border-radius: 5rem;

  cursor: pointer;
`;

const FolderUploadIcon = styled(FolderUploadIc)`
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  margin-top: 0.9rem;
  cursor: pointer;
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  margin-left: -0.2rem;
  margin-top: 1.3rem;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  margin-left: 1rem;
  cursor: pointer;
`;
