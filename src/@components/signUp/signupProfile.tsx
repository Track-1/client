import React from 'react'
import { SetStepPropsType, SignupProfilePropsTye } from '../../type/signUpStepTypes';
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AddHashtagIc,
  DeleteHashtagIc,
  HashtagWarningIc,
  HoverHashtagWarningIc,
  ProfileEditCategoryIc,
  ProfileEditContactIc,
  ProfileEditDescriptionIc,
  ProfileEditHashtagIc,
  ProfileHashtagXIc,
} from "../../assets";
import { CategoryId } from "../../core/constants/categories";
import { editInputDatas } from "../../core/editProfile/editData";
import { CategorySelectType } from "../../type/CategoryChecksType";
import { EditDataType } from "../../type/editDataType";
import { checkMaxInputLength } from "../../utils/uploadPage/maxLength";
import useHover from "../../utils/hooks/useHover";
import ProfileWarning from '../@common/profileWarning';
import { checkHashtagLength } from "../../utils/convention/checkHashtagLength";

export default function SignupProfile(props:SignupProfilePropsTye) {
  const {setStep, userProfile, setUserProfile}=props;
  const contactInputRef = useRef<HTMLInputElement | null>(null);
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [descriptionInput, setDescriptionInput] = useState<string>("");
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
  const [contactInput, setContactInput]=useState<string>("");
  const [isWrite, setIsWrite]=useState<boolean>(false);
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [tagMaxLength, setTagMaxLength]=useState<number>(8);

  function getInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setHashtagInput(e.target.value);

    e.target.value!==""?setHashtagLength(e.target.value.length):setHashtagLength(0);
    
    checkHashtagLength(e.target.value)?(
      e.target.value.length>5?(alert("한글 해시태그는 5자까지 작성할 수 있습니다.")):(setTagMaxLength(5))
    ):(
      e.target.value.length>10?(alert("영문 해시태그는 10자까지 작성할 수 있습니다.")):setTagMaxLength(10));
    }
  
  function completeHashtag() {
      if (hashtagRef.current&& !isDuplicateHashtag(hashtagInput)) {
        hashtagRef.current.value = "";
        setHashtags((prev) => [...prev, hashtagInput]);
        setHashtagInput("");
        setHashtagLength(0);
      }
  }

  function deleteHashtag(index: number) {
   const deleteTag = userProfile.keyword;
    deleteTag.splice(index, 1);
    setHashtags([...deleteTag]);
    setHashtagInput("");
  }

  function isDuplicateHashtag(value: string): boolean {
    const isDuplicate = userProfile.keyword.includes(value);
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
      completeHashtag() 
    }
  }

  function countDescriptionText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescriptionInput(e.target.value);
  }

  function changeContact(e: React.ChangeEvent<HTMLInputElement>){
    if(e.target.value===""){
      setIsWrite(false)
    }
    else{
      setIsWrite(true)
    }
    setContactInput(e.target.value)
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

  useEffect(()=>{
      setUserProfile({
        contact: contactInput,
        category: Array.from(categories),
        keyword: hashtags,
        introduce: descriptionInput,
     });
    
  },[contactInput,categories, isCategorySelected, hashtags, descriptionInput])
  
  function isKorean(){
    return tagMaxLength===5;
  }
  
  return (
    <>
      <InfoContainer>
        <ContactContainer>
          <ProfileEditContactIcon />
          <ContactInput
            type="text"
            placeholder="Enter your phone number or SNS account"
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
          <ProfileWarning/>
            </HashIconWrapper>
          <InputHashtagWrapper>
            {hashtags.map((hashtag, index) => {
                return (
                  <Hashtag key={index}>
                    <CompleteHashtagWrapper>
                      <HashtagSharp># </HashtagSharp>
                      <CompletedHashtag>{hashtag}</CompletedHashtag>
                    </CompleteHashtagWrapper>
                    <DeleteHashtagIcon onClick={() => deleteHashtag(index)} />
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
                      isKorean={isKorean()}
                      ref={hashtagRef}
                      placeholder="HashTag"
                      maxLength={tagMaxLength}
                    />
                  </HashtagWrapper>
                </Hashtag>
              )}

              {hashtags.length < 2 && <AddHashtagIcon onClick={completeHashtag} />}
          </InputHashtagWrapper>
          
        </HashtagContainer>
        <DescriptionContainer>
          <ProfileEditDescriptionIcon />
          <DesciprtionInput
            typeof="text"
            onChange={countDescriptionText}
            placeholder="What kind of work do you do?"
            maxLength={150}
            row={Math.floor(descriptionInput.length/31)+1}
          />
          <TextCount>
            {descriptionInput.length}/<MaxCount>150</MaxCount>
          </TextCount>
        </DescriptionContainer>
      </InfoContainer>
    </>
  );
}

const InfoContainer = styled.section`
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

  :focus{
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
  justify-content: space-between;
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

  margin-top: 2.8rem;
`;

const Hashtag = styled.div`
  display: flex;
  align-items: center;

  height: 3.8rem;

  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.1rem;

  padding-right: 1rem;
  margin-right: 1rem;  
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

const HashtagInput = styled.input<{ inputWidth: number, isKorean:boolean }>`
  width: ${({ inputWidth,isKorean }) => (inputWidth === 0 ? 9 : (isKorean ?inputWidth * 1.5+1:inputWidth*1.2+1))}rem;
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

  cursor: pointer;
`;

const DescriptionContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const DesciprtionInput = styled.textarea<{row:number}>`
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

  :focus{
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

const ProfileEditContactIcon=styled(ProfileEditContactIc)`
  width: 8.8rem;
`

const ProfileEditCategoryIcon=styled(ProfileEditCategoryIc)`
  width: 10.3rem;
`

const ProfileEditHashtagIcon=styled(ProfileEditHashtagIc)`
  width: 9.3rem;
`

const ProfileEditDescriptionIcon=styled(ProfileEditDescriptionIc)`
  width: 12.6rem;
`

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 2.8rem;
  
  margin-left: -1rem;
  cursor: pointer;
`;

const HashIconWrapper=styled.div`
  display: flex;
`