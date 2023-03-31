import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { patchProducerProfile } from "../core/api/producerProfile";
import { CategoryId } from "../core/constants/categories";
import { patchVocalrProfile } from "../core/api/vocalProfile";
import { isTracksPage, isVocalsPage } from "../utils/common/pageCategory";
import Footer from "../@components/@common/footer";
import background from "../assets/icon/signUpBackgroundIc.svg";

export default function VocalProfileEditPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSleep, setIsSleep] = useState<string>(state?.isSelected);
  const [profileImage, setProfileImage] = useState<File>(new File([state?.profileImage], state?.profileImage));
  const [name, setName] = useState<string>(state?.name);
  const [contact, setContact] = useState<string>(state?.contact);
  const [categories, setCategories] = useState<string[]>(state?.category);
  const [hashtags, setHashtags] = useState<string[]>(state?.keyword);
  const [description, setDescription] = useState<string>(state?.introduce);
  const [editReady, setEditReady] = useState<boolean>(false);
  const [saveData, setSaveData] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<any>();

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
      formData.append("isSelected", isSleep);
      setUpdatedData(formData);
    }
  }, [saveData]);

  useEffect(() => {
    if (updatedData !== undefined) {
      mutate();
      navigate(-1);
    }
  }, [updatedData]);

  const { mutate } = useMutation(() => patchVocalrProfile(updatedData), {
    onSuccess: () => {
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

  function changeSleepState() {
    isSleep === "true" ? setIsSleep("false") : setIsSleep("true");
  }

  return (
    <>
      <ProfileEditHeader editReady={editReady} editData={editData} />
      <Img src={background} alt="배경" />
      <EditContainer>
        <VocalProfileEditTitle
          profileImage={profileImage.name}
          name={name}
          updateProfileImage={updateProfileImage}
          updateName={updateName}
          changeReadyState={changeReadyState}
          isSleep={isSleep}
          changeSleepState={changeSleepState}
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
      <Footer />
    </>
  );
}

const EditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const Img = styled.img`
  position: absolute;
  width: 192rem;
  height: 98rem;

  //margin-top: -9.8rem;
`;
