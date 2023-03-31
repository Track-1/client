import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { QueryClient, useMutation } from "react-query";
import { patchProducerProfile } from "../core/api/producerProfile";
import { CategoryId } from "../core/constants/categories";

export default function ProducerProfileEditPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File>(new File([state.profileImage], state.profileImage));
  const [name, setName] = useState<string>(state.name);
  const [contact, setContact] = useState<string>(state.contact);
  const [categories, setCategories] = useState<string[]>(state.category);
  const [hashtags, setHashtags] = useState<string[]>(state.keyword);
  const [description, setDescription] = useState<string>(state.introduce);
  const [editReady, setEditReady] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<any>();
  const queryClient = new QueryClient();

  useEffect(() => {
    if (saveData === true) {
      const formData = new FormData();
      formData.append("imageFile", profileImage);
      formData.append("name", name);
      formData.append("contact", contact);
      categories.forEach((item, index) => {
        formData.append(`category[${index}]`, CategoryId[item]);
      });
      hashtags.forEach((item, index) => {
        formData.append(`keyword[${index}]`, item);
      });
      formData.append("introduce", description);
      setUpdatedData(formData);
    }
  }, [saveData]);

  useEffect(() => {
    if (updatedData !== undefined) {
      mutate();
      navigate(-1);
    }
  }, [updatedData]);

  const { mutate } = useMutation(() => patchProducerProfile(updatedData), {
    onSuccess: () => {
      queryClient.invalidateQueries("userProfile");
      console.log("ok");
    },
    onError: () => {
      console.log("x");
    },
  });

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
    const tempCategorySet = new Set(categories);
    tempCategorySet.has(category) ? tempCategorySet.delete(category) : tempCategorySet.add(category);
    setCategories(Array.from(tempCategorySet));
  }

  function updateHashtag(hashtag: string) {
    setHashtags([...hashtags, hashtag]);
  }

  function deleteHashtag(index: number) {
    const tempHashtag = hashtags;
    tempHashtag.splice(index, 1);
    setHashtags([...tempHashtag]);
  }

  function updateDescription(inputText: string) {
    setDescription(inputText);
  }

  function changeReadyState(isReady: boolean) {
    setEditReady(isReady);
  }

  function editData() {
    setSaveData(true);
  }

  return (
    <>
      <ProfileEditHeader editReady={editReady} editData={editData} />
      <EditContainer>
        <ProducerProfileEditTitle
          profileImage={profileImage}
          name={name}
          updateProfileImage={updateProfileImage}
          updateName={updateName}
          changeReadyState={changeReadyState}
        />
        <ProfileEditInfo
          contact={contact}
          categories={categories}
          hashtags={hashtags}
          description={description}
          updateContact={updateContact}
          updateCategory={updateCategory}
          updateHashtag={updateHashtag}
          deleteHashtag={deleteHashtag}
          updateDescription={updateDescription}
        />
      </EditContainer>
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  padding: 0 21.8rem;
`;
