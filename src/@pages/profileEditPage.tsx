import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import { editInputDatas } from "../core/editProfile/editData";
import { EditDataType, nickName } from "../type/editDataType";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { currentUser } from "../core/constants/userType";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { getVocalProfile, patchVocalrProfile } from "../core/api/vocalProfile";
import { getProducerPortfolio, patchProducerProfile } from "../core/api/producerProfile";

export default function ProfileEditPage() {
  const { state } = useLocation();
  const [profileImage, setProfileImage] = useState<File>(state.profileImage);
  const [name, setName] = useState<string>(state.name);
  const [contact, setContact] = useState<string>(state.contact);
  const [categories, setCategories] = useState<Set<string>>(state.category);
  const [hashtags, setHashtags] = useState<string[]>(state.keyword);
  const [description, setDescription] = useState<string>(state.introduce);

  function updateProfileImage(imgFile: File) {
    setProfileImage(imgFile);
  }

  function updateName(name: string) {
    setName(name);
  }

  function updateContact(contact: string) {
    setContact(contact);
  }

  function updateCategory(category: any) {
    const tempCategorySet = categories;
    tempCategorySet.has(category) ? tempCategorySet.delete(category) : tempCategorySet.add(category);
    setCategories(tempCategorySet);
  }

  function updateHashtag(hashtag: string) {
    setHashtags([...hashtags, hashtag]);
  }

  function updateDescription(inputText: string) {
    setDescription(inputText);
  }

  return (
    <>
      <ProfileEditHeader />
      <EditContainer>
        <ProducerProfileEditTitle
          profileImage={profileImage}
          name={name}
          updateProfileImage={updateProfileImage}
          updateName={updateName}
        />
        {/* <VocalProfileEditTitle
          /> */}
        <ProfileEditInfo />
      </EditContainer>
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 21.8rem;
`;
