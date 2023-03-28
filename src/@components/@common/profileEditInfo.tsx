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

export default function ProfileEditInfo() {
  return (
    <>
      <InfoContainer>
        <ContactContainer>
          <ProfileEditContactIcon />
          <ContactInput />
        </ContactContainer>
        <CategoryContainer>
          <ProfileEditCategoryIcon />
          <CategoryBox>
            <CategoryItem></CategoryItem>
          </CategoryBox>
        </CategoryContainer>
        <HashtagContainer>
          <HashIconWrapper>
            <ProfileEditHashtagIcon />
            <ProfileWarning />
          </HashIconWrapper>
          <InputHashtagWrapper>
            <Hashtag>
              <HashtagWrapper>
                <HashtagSharp># </HashtagSharp>
                <CompletedHashtag></CompletedHashtag>
              </HashtagWrapper>
              <DeleteHashtagIcon />
            </Hashtag>
            <Hashtag>
              <HashtagWrapper>
                <HashtagSharp># </HashtagSharp>
                <HashtagInput />
              </HashtagWrapper>
            </Hashtag>

            <AddHashtagIcon />
          </InputHashtagWrapper>
        </HashtagContainer>
        <DescriptionContainer>
          <ProfileEditDescriptionIcon />
          <DesciprtionInput />
          <TextCount>
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

const CategoryItem = styled.li`
  width: 25%;

  margin-bottom: 1.2rem;
`;

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Hashtag = styled.div`
  display: flex;
  align-items: center;

  height: 3.8rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;

  margin-right: 1rem;
  margin-top: 2.8rem;
`;

const HashtagWrapper = styled.div`
  display: flex;

  padding: 0 1.5rem;
`;

const HashtagSharp = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-right: 0.6rem;
`;

const HashtagInput = styled.input`
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
  margin-top: 2.8rem;
`;

const DescriptionContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const DesciprtionInput = styled.input`
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
