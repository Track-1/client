import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { QueryClient, useMutation } from "react-query";
import { patchProducerProfile } from "../core/api/producerProfile";
import { CategoryId } from "../core/constants/categories";
import { isTracksPage, isVocalsPage } from "../utils/common/pageCategory";
import Footer from "../@components/@common/footer";
import background from "../assets/icon/signUpBackgroundIc.svg";
import Loading from "../@components/@common/loading";
import usePlayer from "../utils/hooks/usePlayer";

export default function ProducerProfileEditPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const profileData = location.state.profileData;
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
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  const queryClient = new QueryClient();
  
  useEffect(() => {
    if (saveData === true) {
      const formData = new FormData();
      isImageUploaded && formData.append("imageFile", profileImage);
      formData.append("name", name);
      formData.append("contact", contact);
      categories.forEach((item, index) => {
        formData.append(`category[${index}]`, CategoryId[item.toUpperCase()]);
      });
      hashtags.forEach((item, index) => {
        formData.append(`keyword[${index}]`, item);
      });
      formData.append("introduce", description);
      isImageUploaded ? formData.append("isSame", "False") : formData.append("isSame", "True");
      setUpdatedData(formData);
    }
  }, [saveData]);

  useEffect(() => {
    if (updatedData !== undefined) {
      mutate();
      navigate(`/producer-profile/${params.id}`, { state: params.id, replace: true });
      window.location.reload();
      // changeKey();
    }
  }, [updatedData]);

  const { mutate, isLoading } = useMutation(() => patchProducerProfile(updatedData), {
    onSuccess: () => {
      queryClient.invalidateQueries("userProfile");
    },
    onError: (error) => {
      console.log(error);
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
      {isLoading && <Loading />}
      <ProfileEditHeader editReady={editReady} editData={editData} />
      <Img src={background} alt="배경" />
      <EditContainer>
        <ProducerProfileEditTitle
          profileImage={profileImage.name}
          name={name}
          updateProfileImage={updateProfileImage}
          updateName={updateName}
          changeReadyState={changeReadyState}
          isImageUploaded={isImageUploaded}
          setIsImageUploaded={setIsImageUploaded}
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
