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
import { isTracksPage, isVocalsPage } from "../utils/common/pageCategory";
import Footer from "../@components/@common/footer";
import background from "../assets/icon/signUpBackgroundIc.svg";

export default function ProducerProfileEditPage() {
  // console.log(useLocation());
  // const { profileData } = useLocation().state;
  const location = useLocation();
  const profileData = location.state.profileData;
  console.log(location);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File>(
    new File([profileData.profileImage], profileData.profileImage),
  );
  const [name, setName] = useState<string>(profileData.name);
  const [contact, setContact] = useState<string>(profileData.contact);
  const [categories, setCategories] = useState<string[]>(profileData.category);
  const [hashtags, setHashtags] = useState<string[]>(profileData.keyword);
  const [description, setDescription] = useState<string>(profileData.introduce);
  const [editReady, setEditReady] = useState<boolean>(true);
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
        formData.append(`category[${index}]`, CategoryId[item.toUpperCase()]);
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
      // changeKey();
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
      <Img src={background} alt="배경" />
      <EditContainer>
        <ProducerProfileEditTitle
          profileImage={profileImage.name}
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
