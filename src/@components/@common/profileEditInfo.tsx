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
import { CategoryId } from "../../core/constants/categories";
import { editInputDatas } from "../../core/editProfile/editData";
import { CategorySelectType } from "../../type/CategoryChecksType";
import { EditDataType } from "../../type/editDataType";
import ProfileWarning from "./profileWarning";

interface PropsType {
  isSave: boolean;
  editDatas: (datas: EditDataType) => void;
  prevDatas: any;
}

export default function ProfileEditInfo(props: PropsType) {
  const { isSave, editDatas, prevDatas } = props;
  const contactInputRef = useRef<HTMLInputElement | null>(null);
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [descriptionInput, setDescriptionInput] = useState<string>(prevDatas?.introduce);
  const [categories, setCategories] = useState<Set<string>>(new Set());
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
  const [contactInput, setContactInput] = useState<string>("");

  useEffect(() => {
    selectPrevCategory(prevDatas?.cagetory);
    inputPrevHashtags(prevDatas?.keyword);
    setHashtags(prevDatas?.keyword)
  }, []);

  console.log(prevDatas);
  useEffect(() => {
    editDatas(getEditDatas());
  }, [isSave]);

  function selectPrevCategory(prevCategories: string[]) {
    prevCategories?.forEach((category) => {
      selectCategory(category);
    });
  }

  function inputPrevHashtags(prevHashtags: string[]) {
    prevHashtags?.forEach((hashtag) => setHashtags((prev) => [...prev, hashtag]));
  }

  function getInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtagInput(e.target.value);
  }

  function completeHashtag() {
    if (hashtagRef.current) {
      hashtagRef.current.value = "";
      setHashtags((prev) => [...prev, hashtagInput]);
    }
  }
console.log(hashtags)

  function deleteHashtag(index: number) {
    const deleteTag = hashtags;
    deleteTag.splice(index, 1);
    setHashtags([...deleteTag]);
    setHashtagInput("");
  }

  function countDescriptionText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionInput(e.target.value);
  }

  function getEditDatas() {
    // if (contactInputRef.current !== null) {
      return {
        // contact: contactInputRef.current.value,
        contact: contactInput,
        category: Array.from(categories),
        keyword: hashtags,
        introduce: descriptionInput,
      };
    // }
   // return editInputDatas;
  }

  function selectCategory(category: string) {
    changeClickedCategoryColor(category);
    changeSelectedCategory(category);
  }

  function changeClickedCategoryColor(category: string) {
    const tempSelected = isCategorySelected;
    tempSelected[category] = !tempSelected[category];
    setIsCategorySelected({ ...tempSelected });
  }

  function changeSelectedCategory(category: string) {
    const tempCatgorySet = categories;
    categories.has(CategoryId[category])
      ? tempCatgorySet.delete(CategoryId[category])
      : tempCatgorySet.add(CategoryId[category]);
    setCategories(new Set(tempCatgorySet));
  }

  function changeContact(e: React.ChangeEvent<HTMLInputElement>) {
    setContactInput(e.target.value);
  }

  return (
    <>
      <InfoContainer>
        <ContactContainer>
          <ProfileEditContactIcon />
          <ContactInput
            ref={contactInputRef}
            placeholder="Enter your phone number or SNS account"
            defaultValue={prevDatas?.contact}
            onChange={changeContact}
            maxLength={40}
          />
        </ContactContainer>
        <CategoryContainer>
          <ProfileEditCategoryIcon />
          <CategoryBox>
            {Object.keys(CategoryId).map((category, index) => {
              return (
                <CategoryItem
                  isSelected={isCategorySelected[category]}
                  onClick={() => {
                    selectCategory(category);
                  }}
                  key={index}>
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
                  <HashtagWrapper>
                    <HashtagSharp># </HashtagSharp>
                    <CompletedHashtag>{hashtag}</CompletedHashtag>
                  </HashtagWrapper>
                  <DeleteHashtagIcon onClick={() => deleteHashtag(index)} />
                </Hashtag>
              );
            })}
            {hashtags?.length < 3 && (
              <Hashtag>
                <HashtagWrapper>
                  <HashtagSharp># </HashtagSharp>
                  <HashtagInput
                    onChange={getInputText}
                    onKeyPress={(e) => {
                      e.key === "Enter" && completeHashtag();
                    }}
                    inputWidth={hashtagInput.length}
                    ref={hashtagRef}
                    placeholder="HashTag"
                    maxLength={10}
                  />
                </HashtagWrapper>
              </Hashtag>
            )}

            {hashtags?.length <= 2 && <AddHashtagIcon onClick={completeHashtag} />}
          </InputHashtagWrapper>
        </HashtagContainer>
        <DescriptionContainer>
          <ProfileEditDescriptionIcon />
          <DesciprtionInput
            typeof="text"
            onChange={countDescriptionText}
            placeholder="What kind of work do you do?"
            defaultValue={prevDatas?.introduce}
            maxLength={150}
            row={Math.floor(descriptionInput?.length / 31) + 1}
          />
          <TextCount>
            {descriptionInput?.length}/<MaxCount>150</MaxCount>
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
  background-image: linear-gradient(#141517, #141517), linear-gradient(to top, transparent 0%, #3e4045 100%);

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
`;

const CategoryContainer = styled.article`
  width: 66rem;

  margin-top: 6.2rem;
  margin-left: 9rem;
`;

const CategoryBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray4};

  ${({ theme }) => theme.fonts.hashtag}

  margin-top: 2.2rem;
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
  /* display: flex;
  flex-wrap: wrap; */
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 2.8rem;
`;

const Hashtag = styled.div`
  display: flex;
  align-items: center;
  height: 3.8rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
  padding-right: 1rem;
  margin-right: 1rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;

const HashtagSharp = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-right: 0.6rem;
`;

const HashtagInput = styled.input<{ inputWidth: number }>`
  width: ${({ inputWidth }) => (inputWidth === 0 ? 9 : inputWidth * 2)}rem;

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

const DescriptionContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const DesciprtionInput = styled.textarea<{ row: number }>`
  height: ${({row})=>row*3.4+1}rem;
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
  padding-bottom: 3rem;
  ${({ theme }) => theme.fonts.input}
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
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
