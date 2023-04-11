import styled from "styled-components";
import { useEffect, useState } from "react";
import ProfileEditInfo from "../@components/@common/profileEditInfo";
import ProfileEditHeader from "../@components/profileEdit/profileEditHeader";
import ProducerProfileEditTitle from "../@components/profileEdit/producerProfileEditTitle";
import VocalProfileEditTitle from "../@components/profileEdit/vocalProfileEditTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import { patchProducerProfile } from "../core/api/producerProfile";
import { CategoryId } from "../core/constants/categories";
import { patchVocalrProfile } from "../core/api/vocalProfile";
import { isTracksPage, isVocalsPage } from "../utils/common/pageCategory";
import Footer from "../@components/@common/footer";
import background from "../assets/icon/signUpBackgroundIc.svg";
import Loading from "../@components/@common/loading";
import { useRecoilState } from "recoil";
import { endPost } from "../recoil/postIsCompleted";
import usePlayer from "../utils/hooks/usePlayer";
import { getCookie } from "../utils/cookie";

export default function VocalProfileEditPage() {
  const { state } = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [isSleep, setIsSleep] = useState<boolean>(state?.isSelected);
  const [profileImage, setProfileImage] = useState<File>(state.profileImage);
  const [name, setName] = useState<string>(state?.name);
  const [contact, setContact] = useState<string>(state?.contact);
  const [categories, setCategories] = useState<string[]>(state?.category);
  const [hashtags, setHashtags] = useState<string[]>(state?.keyword);
  const [description, setDescription] = useState<string>(state?.introduce);
  const [editReady, setEditReady] = useState<boolean>(true);
  const [saveData, setSaveData] = useState<boolean>(false);
  const [updatedData, setUpdatedData] = useState<any>();
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  
  useEffect(() => {
    if (saveData === true) {
      const formData = new FormData();
      formData.append("imageFile", profileImage);
     
      formData.append("name", name);
      formData.append("contact", contact);
      console.log(contact)
      categories.forEach((item, index) => {
        formData.append(`category[${index}]`, CategoryId[item.toUpperCase()]);
      });
      hashtags.forEach((item, index) => {
        formData.append(`keyword[${index}]`, item);
      });
      formData.append("introduce", description);
      formData.append("isSelected", String(isSleep))

      isImageUploaded ? formData.append("isSame", "False") : formData.append("isSame", "True");

      setSaveData(false)
      setUpdatedData(formData);
    }
  }, [saveData]);

useEffect(() => {
    if (updatedData !== undefined) {
      mutate();
      // setTimeout(() => {
      // }, 500);
      // window.location.reload();
    }
  }, [updatedData]);

  const { mutate, isLoading } = useMutation(() => patchVocalrProfile(updatedData), {
    onSuccess: (data) => {
      setIsEnd(true);
      navigate(`/vocal-profile/${params.id}`, { state: params.id, replace: true });
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

  //해시태그
  function updateHashtag(hashtag: string) {
    setHashtags([...hashtags, hashtag]);
  }

  function deleteHashtag(index: number) {
    const tempHashtag = hashtags;
    tempHashtag.splice(index, 1);
    setHashtags([...tempHashtag]);
  }

  function updateDescription(inputText: string) {
    if(inputText.length>150){
      alert("설명은 150자까지 작성할 수 있습니다. ")
    }
    setDescription(inputText);
  }

  function changeReadyState(isReady: boolean) {
    setEditReady(isReady);
  }

  function editData() {
    setSaveData(true);
  }

  function changeSleepState() {
    isSleep ? setIsSleep(false) : setIsSleep(true);
  }
  
  return (
    <>
      {isLoading && <Loading />}
      <ProfileEditHeader editReady={editReady} editData={editData} />
      <Img src={background} alt="배경" />
      <EditContainer>
        <VocalProfileEditTitle
          profileImage={state.profileImage}
          name={name}
          updateProfileImage={updateProfileImage}
          updateName={updateName}
          changeReadyState={changeReadyState}
          isSleep={isSleep}
          changeSleepState={changeSleepState}
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
