import styled, { useTheme } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserType } from "../recoil/main";
import { UploadBackIc, UploadBtnIc, CanUploadBtnIc, HashtagWarningIc } from "../assets";
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
import { Categories, CategoryDropdown, CategoryId } from "../core/constants/categories";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoriesDropdownType, CategoryIdType } from "../type/CategoryChecksType";
import { useMutation } from "react-query";
import { patchProducerPortfolio } from "../core/api/producerProfile";
import BackButton from "../@components/@common/backButton";
import ProfileWarning from "../@components/@common/profileWarning";
import { checkHashtagLength } from "../utils/convention/checkHashtagLength";
import useHover from "../utils/hooks/useHover";
import { showPlayerBar } from "../recoil/player";
import Loading from "../@components/@common/loading";
import usePlayer from "../utils/hooks/usePlayer";

export default function ProducerPortfolioEditPage() {
  const userType = useRecoilValue(UserType);
  const prevData = useLocation().state;
  const [hashtagWarningOpen, setHahtagWarningOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File>(prevData?.profileImage);
  const [title, setTitle] = useState<string>(prevData?.title);
  const [audioFile, setAudioFile] = useState<File>(prevData?.beatWavFile);
  const [category, setCategory] = useState<string>(prevData?.category);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hashtag, setHashtag] = useState<string[]>(prevData?.keyword);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [description, setDescription] = useState<string>(prevData?.content);
  const [complete, setComplete] = useState<boolean>(false);
  const [editData, setEditdata] = useState<any>();
  const [showImage, setShowImage] = useState<string | ArrayBuffer>();
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [hashtagText, setHashtagText] = useState<string>("");
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [tagMaxLength, setTagMaxLength] = useState<number>(10);
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const { hoverState, changeHoverState } = useHover();
  const [isKorean, setIsKorean] = useState<boolean>(false);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [titleLength, setTitleLength]=useState<number>(0);

  const navigate = useNavigate();

  function convert() {}

  function toggleHashtagWarningOpen() {
    setHahtagWarningOpen(!hashtagWarningOpen);
  }

  const { mutate, isLoading } = useMutation(() => patchProducerPortfolio(prevData.id, editData), {
    onSuccess: () => {
      setShowPlayer(false);
      navigate(-1);
    },
    onError: () => {
      navigate(-1);
    },
  });

  function getImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFiles = e.target.files as FileList;
    setImage(imageFiles[0]);
    showPrevImage(imageFiles);
    setIsImageUploaded(true);
  }

  function showPrevImage(imageFiles: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFiles[0]);
    reader.onloadend = () => {
      const resultImage = reader.result;
      resultImage && setShowImage(resultImage);
    };
  }

  function getFileName(e: React.ChangeEvent<HTMLInputElement>) {
    setAudioFile(e.target.files![0]);
  }

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function selectCategory(text: string) {
    setCategory(CategoryDropdown[text.toLowerCase()]);
    toggleDropdown();
  }

  function deleteHashtag(index: number) {
    const deleteTag = hashtag;
    deleteTag.splice(index, 1);
    setHashtag([...deleteTag]);
    setHashtagInput("");
  }


  function getInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtagText(e.target.value);

    setHashtagInput(e.target.value);

    e.target.value !== "" ? setHashtagLength(e.target.value.length) : setHashtagLength(0);

    if (checkHashtagLength(e.target.value)) {
      setIsKorean(true);
      e.target.value.length > 10 && alert("해시태그는 10자까지 작성할 수 있습니다.");
    } else {
      setIsKorean(false);
    }
  }

  function addHashtag() {
    if (hashtagRef.current && !isDuplicateHashtag(hashtagInput)) {
      hashtagRef.current.value = "";
      setHashtag((prev) => [...prev, hashtagInput]);
      setHashtagInput("");
      setHashtagText("");
      setHashtagLength(0);
    }
  }

  function isDuplicateHashtag(value: string): boolean {
    const isDuplicate = hashtag.includes(value);
    isDuplicate && alert("중복된 해시태그 입니다!");
    return isDuplicate;
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  function clickOutSide(e: any) {
    if (!hashtagRef.current?.contains(e.target) && hashtagRef.current?.value) {
      addHashtag();
    }
  }
  function checkDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function conpleteEdit() {
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    isImageUploaded && formData.append("jacketImage", image);
    formData.append("title", title);
    formData.append("category", CategoryId[category.toUpperCase()]);
    formData.append("content", description);
    hashtag.forEach((item, index) => {
      formData.append(`keyword[${index}]`, item);
    });
    isImageUploaded ? formData.append("isSame", "False") : formData.append("isSame", "True");
    setEditdata(formData);
    setComplete(true);
  }

  function updateTitle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if(e.target.value.length>28){
      alert("제목은 28자까지 작성할 수 있습니다.")
    }
    setTitle(e.target.value);
    setTitleLength(e.target.value.length);
  }

  useEffect(() => {
    complete && mutate();
  }, [complete]);

  function movePreviousPage() {
    navigate(-1);
  }

  function hoverImage() {
    isImageHovered ? setIsImageHovered(false) : setIsImageHovered(true);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Container>
        <HeaderWrapper>
          <LeftWrapper>
            <div onClick={movePreviousPage}>
              <BackButton />
            </div>
            <UserClass> {}</UserClass>
          </LeftWrapper>
          <CanUploadBtnIcon onClick={conpleteEdit} />
        </HeaderWrapper>
      </Container>
      <Container2>
        <SectionWrapper>
          <TrackImageBox onMouseEnter={hoverImage} onMouseLeave={hoverImage}>
            <TrackUploadImageWrapper htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              {isImageUploaded ? (
                <TrackUploadImage src={String(showImage)} alt="썸네일 이미지" isImageHovered={isImageHovered} />
              ) : (
                <TrackUploadImage src={prevData?.jacketImage} alt="썸네일 이미지" isImageHovered={isImageHovered} />
              )}
            </TrackUploadImageWrapper>
            {isImageHovered && (
              <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
                <FileChangeIcon />
              </label>
            )}
          </TrackImageBox>
          <input
            type="file"
            id="imageFileUpload"
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png"
            readOnly
            onChange={getImageFile}
          />
          <Container3>
          <TitleInput
              typeof="text"
              placeholder="Please enter a title"
              spellCheck={false}
              maxLength={28}
              defaultValue={title}
              onChange={updateTitle}
              row={titleLength<18?4.5:Math.floor(titleLength/17)+6.5}
            />
            <Line />

            <TextCount>
              <TextWrapper>
                <InputCount>{title.length}</InputCount>
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
                  <UploadCategoryIcon />
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

              <HashTagInfoItemBox>
                <NameBox>
                  <UploadHashtagIcon />
                </NameBox>
                <InputBox>
                  <InputHashtagWrapper>
                    <>
                      {hashtag?.map((item: string, index: number) => {
                        return (
                          <InputHashtagWrapper>
                            <Hashtag key={index}>
                              <HashtagWrapper>
                                <HashtagSharp># </HashtagSharp>
                                <CompletedHashtag>{item}</CompletedHashtag>
                                <DeleteHashtagIcon onClick={() => deleteHashtag(index)} />
                              </HashtagWrapper>
                            </Hashtag>
                          </InputHashtagWrapper>
                        );
                      })}
                      <>
                        {hashtag.length < 3 && (
                          <InputHashtagWrapper>
                            <Hashtag>
                              <HashtagWrapper>
                                <HashtagSharp># </HashtagSharp>
                                <HashtagInput
                                  onChange={getInputText}
                                  onKeyPress={(e) => {
                                    e.key === "Enter" && addHashtag();
                                  }}
                                  inputWidth={hashtagLength}
                                  isKorean={isKorean}
                                  ref={hashtagRef}
                                  placeholder="HashTag"
                                  maxLength={tagMaxLength}
                                />
                              </HashtagWrapper>
                            </Hashtag>
                          </InputHashtagWrapper>
                        )}
                        {hashtag.length < 2 && <AddHashtagIcon onClick={addHashtag} />}
                      </>
                    </>
                  </InputHashtagWrapper>

                  <WarningIcon onMouseEnter={(e) => changeHoverState(e)} onMouseLeave={(e) => changeHoverState(e)}>
                    {hoverState ? (
                      <>
                        <HoverHashtagWarningIcon />
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
                      {category === Categories[index] && <CheckCategoryIcon />}
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

const UploadDescriptionIcon = styled(UploadDescriptionIc)`
  width: 14.6rem;
`;

const UploadHashtagIcon = styled(UploadHashtagIc)`
  width: 11.2rem;
`;

const UploadCategoryIcon = styled(UploadCategoryIc)`
  width: 12.3rem;
`;
const UploadFileUpdateIcon = styled(UploadFileUpdateIc)`
  width: 13.3rem;
`;

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
  width: 24.6rem;
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

const TrackImageBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 38rem;
  cursor: pointer;
`;

const TrackUploadImageWrapper = styled.label`
  width: 60.4rem;
  height: 60.4rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  overflow: hidden;
`;

const TrackUploadImage = styled.img<{ isImageHovered: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  filter: blur(${({ isImageHovered }) => isImageHovered && 3}rem);
`;

const FileChangeIcon = styled(FileChangeIc)`
  width: 18.9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const Container3 = styled.section`
  margin-right: 3rem;
  height: 74.7rem;
  width: 88.7rem;
`;

const TitleInput = styled.textarea<{row:number}>`
  width: 100%;
  height:${({row})=>row<1?6.5:row*2-2}rem;

  font-size: 5rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({row})=>row===4.5?13.6:7.6}rem;

  outline: 0;
  resize: none;
  overflow: hidden;
  background-color: transparent;

  border: none;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
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

  margin-left: 2rem;
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

const HashTagInfoItemBox = styled.div`
  height: 9rem;
  width: 100%;

  display: flex;
  margin-bottom: 0.2rem;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  // height: 9rem;
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
  margin: 0.9rem 1.5rem;
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

const InputDescriptionText = styled.textarea`
  width: 72rem;
  height: 4rem;

  outline: 0;
  resize: none;
  overflow: hidden;
  background-color: transparent;

  border: none;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.7rem;
  margin-left: 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const WarningTextWrapper = styled.div`
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  top: 62rem;
  left: 136.5rem;
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
  margin-top: 2.5rem;
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

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 4rem;
  height: 4rem;
  margin-left: -0.2rem;
  margin-top: 1.2rem;

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 1rem;
  height: 1rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const ProfileWarningWrapper = styled.section`
  position: absolute;
  margin-top: 1rem;
  margin-right: 10rem;
  right: 0;
`;

const CompletedHashtag = styled.article`
  display: flex;
  align-items: center;

  //padding-left: 0.5rem;
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag}
`;

const HoverHashtagWarningIcon = styled(HoverHashtagWarningIc)`
  width: 4rem;
  height: 4rem;
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  width: 4rem;
  height: 4rem;
`;

const CheckCategoryIcon = styled(CheckCategoryIc)`
  width: 1.5rem;
  height: 0.9rem;
`;
