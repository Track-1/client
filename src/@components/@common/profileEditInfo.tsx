import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AddHashtagIc,
  DeleteHashtagIc,
  ProfileEditCategoryIc,
  ProfileEditContactIc,
  ProfileEditDescriptionIc,
  ProfileEditHashtagIc,
} from "../../assets";
import { CategoryId, CategoryText } from "../../core/constants/categories";
import { CategorySelectType } from "../../type/CategoryChecksType";
import { checkHashtagLength } from "../../utils/convention/checkHashtagLength";
import useTextareaHeight from "../../utils/hooks/useTextareaHeight";
import ProfileWarning from "./profileWarning";

interface PropsType {
  contact: string;
  categories: string[];
  hashtags: string[];
  description: string;
  updateContact: (contact: string) => void;
  updateCategory: (contact: string) => void;
  updateHashtag: (hashtag: string) => void;
  deleteHashtag: (index: number) => void;
  updateDescription: (inputText: string) => void;
}

export default function ProfileEditInfo(props: PropsType) {
  const {
    contact,
    categories,
    hashtags,
    description,
    updateContact,
    updateCategory,
    updateHashtag,
    deleteHashtag,
    updateDescription,
  } = props;
  const [isCategorySelected, setIsCategorySelected] = useState<CategorySelectType>({
    "R&B": false,
    HIPHOP: false,
    BALLAD: false,
    POP: false,
    ROCK: false,
    EDM: false,
    JAZZ: false,
    HOUSE: false,
    FUNK: false,
  });
  const [hashtagText, setHashtagText] = useState<string>("");
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [tagMaxLength, setTagMaxLength] = useState<number>(10);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const [isKorean, setIsKorean] = useState<boolean>(false);
  const { textareaRef, isMaxHeightReached } = useTextareaHeight(200);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(0);

  useEffect(() => {
    if (textareaRef.current !== null) {
      setDescriptionHeight(textareaRef.current.scrollHeight);
    }
  }, []);

  function selectCategory(category: string) {
    const tempSelected = isCategorySelected;
    tempSelected[category] = !tempSelected[category];
    setIsCategorySelected({ ...tempSelected });
    updateCategory(CategoryText[category]);
  }

  function deleteHashtagInput(index: number) {
    deleteHashtag(index);
  }

  function checkHashtagText(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtagText(e.target.value);

    setHashtagInput(e.target.value);
    e.target.value !== "" ? setHashtagLength(e.target.value.length) : setHashtagLength(0);

    if (checkHashtagLength(e.target.value)) {
      setIsKorean(true);
      e.target.value.length > 10 &&
        alert("Hashtags can contain up to 10 characters.\n해시태그는 10자까지 작성할 수 있습니다.");
    } else {
      setIsKorean(false);
    }
  }

  function getHashtagInput() {
    if (hashtagRef.current && !isDuplicateHashtag(hashtagInput)) {
      hashtagRef.current.value = "";
      updateHashtag(hashtagText);
      setHashtagText("");
      setHashtagInput("");
      setHashtagLength(0);
    }
  }

  function isDuplicateHashtag(value: string): boolean {
    const isDuplicate = hashtags.includes(value);
    isDuplicate && alert("This hashtag is already used.\n중복된 해시태그입니다.");
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
      getHashtagInput();
    }
  }

  return (
    <>
      <InfoContainer>
        <ContactContainer>
          <ProfileEditContactIcon />
          <ContactInput
            defaultValue={contact}
            placeholder="Enter your phone number or SNS account"
            onChange={(e) => updateContact(e.target.value)}
            maxLength={40}
          />
        </ContactContainer>
        <CategoryContainer>
          <ProfileEditCategoryIcon />
          <CategoryBox>
            {Object.keys(CategoryId).map((category, index) => {
              if (categories.includes(CategoryText[category])) {
                isCategorySelected[category] = true;
              }
              return (
                <CategoryItem
                  key={index}
                  isSelected={isCategorySelected[category]}
                  onClick={() => selectCategory(category)}>
                  {category}
                </CategoryItem>
              );
            })}
          </CategoryBox>
        </CategoryContainer>
        <HashtagContainer>
          <HashIconWrapper>
            <ProfileEditHashtagIcon />
            <ProfileWarning />
          </HashIconWrapper>
          <InputHashtagWrapper>
            {hashtags?.map((hashtag, index) => {
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

            {hashtags.length < 2 && <AddHashtagIcon onClick={getHashtagInput} />}
          </InputHashtagWrapper>
        </HashtagContainer>
        <DescriptionContainer>
          <ProfileEditDescriptionIcon />
          <DesciprtionInput
            typeof="text"
            placeholder="What kind of work do you do?"
            maxLength={150}
            defaultValue={description}
            onChange={(e) => updateDescription(e.target.value)}
            ref={textareaRef}
            style={{ height: `${descriptionHeight}px` }}
          />
          <TextCount>
            {description?.length}
            <MaxCount>150</MaxCount>
          </TextCount>
        </DescriptionContainer>
      </InfoContainer>
    </>
  );
}

const InfoContainer = styled.section`
  height: 88.8rem;
  width: 77.9rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent 0%, #3e4045 100%);

  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactContainer = styled.article`
  margin-top: 8.9rem;

  display: flex;
  flex-direction: column;
`;

const ContactInput = styled.input`
  height: 3.4rem;
  width: 55.9rem;

  margin-top: 3.3rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};

  padding-bottom: 0.5rem;

  ${({ theme }) => theme.fonts.input}

  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  :focus {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white};
  }
`;

const CategoryContainer = styled.article`
  width: 66rem;

  margin-top: 6.2rem;
  margin-left: 9rem;
`;

const CategoryBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  align-items: center;

  color: ${({ theme }) => theme.colors.gray4};

  ${({ theme }) => theme.fonts.hashtag}

  margin-top: 2.2rem;

  cursor: pointer;
`;

const CategoryItem = styled.li<{ isSelected: boolean }>`
  width: 25%;

  margin-bottom: 1.2rem;

  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray4)};
`;

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
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

const DescriptionContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const DesciprtionInput = styled.textarea`
  width: 55.9rem;
  outline: 0;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  border: none;
  background-color: transparent;
  margin-top: 3rem;
  overflow: hidden;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
  padding-bottom: 1rem;
  ${({ theme }) => theme.fonts.input}
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  :focus {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.white};
  }
`;

const TextCount = styled.div`
  display: flex;
  float: right;

  ${({ theme }) => theme.fonts.description}

  color: ${({ theme }) => theme.colors.white};
`;

const MaxCount = styled.strong`
  ${({ theme }) => theme.fonts.description}

  color: ${({ theme }) => theme.colors.gray3};
`;

const ProfileEditContactIcon = styled(ProfileEditContactIc)`
  width: 8.8rem;
`;

const ProfileEditCategoryIcon = styled(ProfileEditCategoryIc)`
  width: 10.3rem;
`;

const ProfileEditHashtagIcon = styled(ProfileEditHashtagIc)`
  width: 9.3rem;
`;

const ProfileEditDescriptionIcon = styled(ProfileEditDescriptionIc)`
  width: 12.6rem;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 2.8rem;

  margin-left: -1rem;
  cursor: pointer;
`;

const HashIconWrapper = styled.div`
  display: flex;
`;

const CompleteHashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;
