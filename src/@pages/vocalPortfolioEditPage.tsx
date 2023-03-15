import styled, { useTheme } from "styled-components";
import { useRecoilValue } from "recoil";
import { UserType } from "../recoil/main";
import { UploadBackIc, UploadBtnIc, CanUploadBtnIc } from "../assets";
import { FileChangeIc } from "../assets";
import {
  UploadFileUpdateIc,
  UploadCategoryIc,
  UploadHashtagIc,
  UploadDescriptionIc,
  FolderUploadIc,
  CategoryDropDownIc,
  AddHashtagIc,
  HoverHashtagWarningIc,
  DeleteHashtagIc,
  CheckCategoryIc,
} from "../assets";
import { Categories, CategoryDropdown } from "../core/constants/categories";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoriesDropdownType, CategoryIdType } from "../type/CategoryChecksType";
import { useMutation } from "react-query";
import { patchProducerPortfolio } from "../core/api/producerProfile";

export default function VocalPortfolioEditPage() {
  const userType = useRecoilValue(UserType);
  const prevData = useLocation().state;
  const hashtagText = useRef<HTMLInputElement | null>(null);
  const [hashtagWarningOpen, setHahtagWarningOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(prevData?.jacketImage);
  const [title, setTitle] = useState<string>(prevData?.title);
  const [audioFile, setAudioFile] = useState<File>(prevData?.beatWavFile);
  const [category, setCategory] = useState<string>(CategoryDropdown[prevData?.category]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hashtag, steHashtag] = useState<string[]>(prevData?.keyword);
  const [hashtagInput, setHashtegInput] = useState<string>("");
  const [description, setDescription] = useState<string>(prevData?.content);
  const [complete, setComplete] = useState<boolean>(false);
  const [editData, setEditdata] = useState<any>();
  const navigate = useNavigate();

  function toggleHashtagWarningOpen() {
    setHahtagWarningOpen(!hashtagWarningOpen);
  }

  useEffect(() => {
    console.log(prevData);
  });

  useEffect(() => {
    hashtagText.current!.value = "";
  }, [hashtag]);

  const { mutate } = useMutation(() => patchProducerPortfolio(prevData.id, editData), {
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      console.log(editData);
      navigate(-1);
    },
  });

  function getFileName(e: any) {
    setAudioFile(e.target.files[0]);
  }

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function selectCategory(text: string) {
    setCategory(CategoryDropdown[text.toLowerCase()]);
    toggleDropdown();
  }

  function deleteHashtag(deleteTarget: string) {
    const temp: string[] = [];
    hashtag.forEach((keyword) => {
      if (keyword !== deleteTarget) temp.push(keyword);
    });
    steHashtag(temp);
  }

  function changeHashtagWidth(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtegInput(e.target.value);
  }

  function addHashtag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter" && hashtagText.current !== null) {
      steHashtag((prev) => [...prev, hashtagText.current!.value]);
    }
  }

  function checkDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function conpleteEdit() {
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("jacketImage", image);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", description);
    formData.append("keyword", hashtag[0]);
    setEditdata(formData);
    mutate();
    setComplete(true);
  }

  return (
    <>
      <Container>
        <HeaderWrapper>
          <LeftWrapper>
            <UploadBackIcon />
            <UserClass> {}</UserClass>
          </LeftWrapper>
          <CanUploadBtnIcon onClick={conpleteEdit} />
        </HeaderWrapper>
      </Container>
      <Container2>
        <SectionWrapper>
          <VocalImageBox>
            <VocalImageFrame />
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              <TrackUploadImage src={image} alt="썸네일 이미지" />
            </label>
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              <FileChangeIcon />
            </label>
          </VocalImageBox>
          <input type="file" id="imageFileUpload" style={{ display: "none" }} accept=".jpg,.jpeg,.png" readOnly />
          <Container3>
            <TitleInput
              typeof="text"
              placeholder="Please enter a title"
              spellCheck={false}
              maxLength={36}
              defaultValue={title}
            />
            <Line />

            <TextCount>
              <TextWrapper>
                <InputCount>{}</InputCount>
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
                    <InputFileTextWrapper fileName="">
                      <FileName value={String(audioFile)} />
                      <FileAttribute>{}</FileAttribute>
                      <input
                        type="file"
                        id="wavFileUpload"
                        style={{ display: "none" }}
                        accept=".wav,.mp3"
                        onChange={getFileName}
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
                    <InputCategoryTextWrapper>
                      <InputCategoryText>{category}</InputCategoryText>
                    </InputCategoryTextWrapper>
                    <CategoryDropDownIcon onClick={toggleDropdown} />
                  </InputWrapper>
                </InputBox>
              </InfoItemBox>

              <InfoItemBox>
                <NameBox>
                  <UploadHashtagIc />
                </NameBox>
                <InputBox>
                  <InputWrapper>
                    <>
                      {hashtag?.map((item: string, index: number) => {
                        return (
                          <InputHashtagWrapper>
                            <Hashtag key={index}>
                              <HashtagWrapper>
                                <HashtagSharp>{`# ${item}`}</HashtagSharp>
                                <DeleteHashtagIcon onClick={() => deleteHashtag(item)} />
                              </HashtagWrapper>
                            </Hashtag>
                          </InputHashtagWrapper>
                        );
                      })}
                      <>
                        <InputHashtagWrapper>
                          <Hashtag>
                            <HashtagWrapper>
                              <HashtagSharp># </HashtagSharp>
                              <HashtagInput
                                placeholder="Hashtag"
                                type="text"
                                defaultValue=""
                                onChange={changeHashtagWidth}
                                width={hashtagInput.length}
                                onKeyUp={addHashtag}
                                ref={hashtagText}
                              />
                              <div style={{ width: "1" }}></div>
                            </HashtagWrapper>
                          </Hashtag>
                        </InputHashtagWrapper>
                        <AddHashtagIcon />
                      </>
                    </>
                  </InputWrapper>

                  <WarningIcon>
                    <>
                      <HoverHashtagWarningIc onClick={toggleHashtagWarningOpen} />
                      {hashtagWarningOpen && (
                        <WarningTextWrapper>
                          <WarningText>
                            1. 해시태그는 최대 3개까지 추가 가능합니다.
                            <br />
                            2. 최대 10자까지 작성이 가능합니다.
                            <br />
                            3. 트랙의 분위기에 대해 설명해주세요. (ex. tropical, dynamic)
                          </WarningText>
                        </WarningTextWrapper>
                      )}
                    </>
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
                    defaultValue={description}
                    onChange={checkDescription}></InputDescriptionText>
                </InputBox>
              </InfoItemBox>
            </InfoContainer>
            <TextCount>
              <TextWrapper>
                <InputCount>{description?.length}</InputCount>
                <LimitCount>/250</LimitCount>
              </TextWrapper>
            </TextCount>
            {showDropdown && (
              <DropMenuBox>
                <DropMenuWrapper>
                  {Categories.map((text: string, index: number) => (
                    <DropMenuItem>
                      <DropMenuText onClick={() => selectCategory(text)}>{text}</DropMenuText>
                      {category === Categories[index] && <CheckCategoryIc />}
                    </DropMenuItem>
                  ))}
                </DropMenuWrapper>
              </DropMenuBox>
            )}
          </Container3>
        </SectionWrapper>
      </Container2>
    </>
  );
}

const Container = styled.header`
  height: 13.8rem;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 7.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserClass = styled.div`
  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.gray3};
  margin-left: 6.1rem;
`;

const UploadBackIcon = styled(UploadBackIc)`
  cursor: pointer;
`;

const UploadBtnIcon = styled(UploadBtnIc)`
  cursor: pointer;
`;

const CanUploadBtnIcon = styled(CanUploadBtnIc)`
  cursor: pointer;
`;

const Container2 = styled.section`
  height: 76.2rem;
  width: 171rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;
  /* width: 138.2rem; */

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const VocalImageBox = styled.div`
  width: 59.8rem;

  display: flex;
  align-items: center;
  transform: rotate(0deg);
  margin-left: 7.3rem;
  margin-right: 7.5rem;
`;

const VocalImageFrame = styled.div`
  height: 45.1rem;
  width: 45.1rem;

  margin-left: 7.8rem;
  margin-bottom: 2rem;
  border-radius: 5rem;
  transform: rotate(45deg);
  overflow: hidden;
  object-fit: cover;
`;

const TrackUploadImage = styled.img`
  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  border-radius: 50%;

  background: rgba(30, 32, 37, 0.5);
  filter: blur(3rem);

  background: default;
  filter: default;
`;

const FileChangeIcon = styled(FileChangeIc)`
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;

const Container3 = styled.section`
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

  border: 1px solid ${({ theme }) => theme.colors.white};
  margin-left: 5px;
`;

const TextCount = styled.div`
  height: 2.3rem;
  width: 100%;

  ${({ theme }) => theme.fonts.body1};
  margin-top: 1.8rem;
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

const FileName = styled.input`
  height: 2.5rem;
  width: 16.4rem;

  display: flex;
  align-items: center;

  text-overflow: ellipsis;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
  cursor: default;
`;

const FileAttribute = styled.div`
  height: 2.5rem;
  width: 100%;
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
  border-bottom: 1px solid
    ${(props) => (props.fileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryTextWrapper = styled.div`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
`;

const InputCategoryText = styled.div`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
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

const HashtagInput = styled.input<{ width: number }>`
  width: ${({ width }) => (width === 0 ? 3 : width)}rem;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const InputDescriptionText = styled.textarea`
  width: 72rem;
  height: 4rem;

  outline: 0;
  resize: none;
  background-color: transparent;

  border: none;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white};
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

const DropMenuBox = styled.div`
  width: 13rem;

  position: absolute;
  top: 54.4rem;
  left: 113.7rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(6.5px);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li`
  height: 3.2rem;
  width: 9.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
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

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  margin-left: 1rem;
  cursor: pointer;
`;
