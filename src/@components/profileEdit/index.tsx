import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ProfileBackgroundIc, UploadActiveSaveButtonIc, UploadUnActiveSaveButtonIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useHashtagInput from "../../hooks/common/useHashtagInput";
import useInputText from "../../hooks/common/useInputText";
import useUploadImageFile from "../../hooks/common/useUploadImageFile";
import useSelectCategory from "../../hooks/producerProfileEdit/useSelectCategories";
import { useEditProdcerProfile, useEditVocalProfile } from "../../hooks/queries/profile";
import { ProfileEditType, VocalProfileEditType } from "../../type/profile";
import Header from "../@common/header";
import ProducerImageEdit from "./producerProfileEdit/producerImageEdit";
import ProfileContactEdit from "./profileContactEdit";
import ProfileDescriptionEdit from "./profileDescriptionEdit";
import ProfileHashtagEdit from "./profileHashtagEdit";
import ProfileNameEdit from "./profileNameEdit";
import ProfileSelectCategoryEdit from "./profileSelectCategoryEdit";
import VocalImageEdit from "./vocalProfileEdit/vocalImageEdit";
import VocalSleeper from "./vocalProfileEdit/vocalSleeper";
import { useRecoilValue } from "recoil";
import { useGetProducerProfile, useGetVocalProfile } from "../../hooks/queries/mypage";
import { loginUserId, loginUserType } from "../../recoil/common/loginUserData";

export default function ProfileEditContainer() {
  const { imageFile, previewImage, changePreviewImage, handleUploadImageFile } = useUploadImageFile();
  const [description, handleChangeDescription, changeDescription] = useInputText("", TEXT_LIMIT.PROFILE_DESCRIPTION);
  const { categories, isCategorySelected, handleSelectCategory } = useSelectCategory();
  const [isUploadActive, setIsUploadActive] = useState(false);

  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    changeHashtags,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();
  const [isSleep, setIsSleep] = useState(false);
  const { editProducerProfile } = useEditProdcerProfile();
  const { editVocalProfile } = useEditVocalProfile();

  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { vocalProfile } = useGetVocalProfile(userId, userType);
  const { producerProfile } = useGetProducerProfile(userId, userType);

  useEffect(() => {
    if (vocalProfile) {
      changePreviewImage(vocalProfile.userProfile.userImageFile);
      changeDescription(
        vocalProfile.userProfile.userIntroduction === null ? "" : vocalProfile.userProfile.userIntroduction,
      );
      vocalProfile.userProfile.userCategory.forEach((category: string) => {
        handleSelectCategory(category);
      });
      nameMethods.setValue("nickName", vocalProfile.userProfile.userName, {});
      contactMethods.setValue("contact", vocalProfile.userProfile.userContact, {});
    }
    if (producerProfile) {
      changePreviewImage(producerProfile.userProfile.userImageFile);
      changeDescription(
        producerProfile.userProfile.userIntroduction === null ? "" : producerProfile.userProfile.userIntroduction,
      );
      changeHashtags(producerProfile.userProfile.userKeyword);
      producerProfile.userProfile.userCategory.forEach((category: string) => {
        handleSelectCategory(category);
      });
      nameMethods.setValue("nickName", producerProfile.userProfile.userName, {});
      contactMethods.setValue("contact", producerProfile.userProfile.userContact, {});
    }
  }, [vocalProfile, producerProfile]);

  const [imageFileSame, setImageFileSame] = useState(true);

  const nameMethods = useForm({
    defaultValues: {
      nickName: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    imageFile !== null ? setImageFileSame(false) : setImageFileSame(true);
  }, [imageFile]);

  const contactMethods = useForm({
    defaultValues: {
      contact: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const nickName = nameMethods.getValues().nickName;
    return nickName !== "" ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [nameMethods.watch()]);

  function handleChangeIsSleep() {
    setIsSleep((prev) => !prev);
  }

  function producerProfileData() {
    const data: ProfileEditType = {
      userImageFile: imageFile,
      userName: nameMethods.getValues().nickName,
      userContact: contactMethods.getValues().contact,
      userCategory: categories,
      userKeyword: hashtags,
      userIntroduction: description,
      userImageFileSame: imageFileSame,
    };
    return data;
  }

  console.log(imageFileSame);

  function vocalProfileData() {
    const data: VocalProfileEditType = {
      userImageFile: imageFile,
      userName: nameMethods.getValues().nickName,
      userContact: contactMethods.getValues().contact,
      userCategory: categories,
      userKeyword: hashtags,
      userIntroduction: description,
      userImageFileSame: imageFileSame,
      userTrackSearch: isSleep,
    };
    return data;
  }

  function editProfile() {
    if (userType === ROLE.PRODUCER) {
      return editProducerProfile(producerProfileData());
    } else {
      return editVocalProfile(vocalProfileData());
    }
  }

  return (
    <>
      <Header backBtn prevURL={`/producer-profile/${userId}`}>
        {isUploadActive ? <UploadActiveSaveButtonIcon onClick={editProfile} /> : <UploadUnActiveSaveButtonIcon />}
      </Header>
      <ProfileBackgroundIcon />
      <ProfileEditContainerBox>
        <ProfileEditTitle>
          {userType === ROLE.PRODUCER ? (
            <>
              <ProducerImageEdit previewImage={previewImage} handleUploadImageFile={handleUploadImageFile} />
              <ProfileNameEdit methods={nameMethods} />
            </>
          ) : (
            <>
              <VocalImageEdit previewImage={previewImage} handleUploadImageFile={handleUploadImageFile} />
              <ProfileNameEdit methods={nameMethods} />
              <VocalSleeper isSleep={isSleep} handleChangeIsSleep={handleChangeIsSleep} />
            </>
          )}
        </ProfileEditTitle>

        <ProfileEditInfo>
          <ProfileEditInfoWrapper>
            <ProfileContactEdit methods={contactMethods} />
            <ProfileSelectCategoryEdit
              isCategorySelected={isCategorySelected}
              handleSelectCategory={handleSelectCategory}
            />
            <ProfileHashtagEdit
              hashtags={hashtags}
              hashtagLength={hashtagLength}
              hashtagInputText={hashtagInputText}
              handleAddHashtag={handleAddHashtag}
              handleRemoveHashtag={handleRemoveHashtag}
              handleChangeHashtagInputText={handleChangeHashtagInputText}
            />
            <ProfileDescriptionEdit
              description={description}
              handleChangeDescription={handleChangeDescription}
              isProfile={true}
            />
          </ProfileEditInfoWrapper>
        </ProfileEditInfo>
      </ProfileEditContainerBox>
    </>
  );
}

export const ProfileBackgroundIcon = styled(ProfileBackgroundIc)`
  position: absolute;

  width: 192rem;
  height: 98rem;
`;

export const ProfileEditContainerBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 67.7rem;
  height: 88.8rem;

  border: 0.3rem solid transparent;
  border-radius: 5rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  align-items: center;
`;

export const ProfileEditInfoWrapper = styled.div`
  margin-top: 8.9rem;
`;

export const ProfileEditTitle = styled(ProfileContainer)``;

export const ProfileEditInfo = styled(ProfileContainer)`
  width: 77.9rem;
`;

export const UploadActiveSaveButtonIcon = styled(UploadActiveSaveButtonIc)`
  width: 24.6rem;
  cursor: pointer;
`;

export const UploadUnActiveSaveButtonIcon = styled(UploadUnActiveSaveButtonIc)`
  width: 24.6rem;
  cursor: pointer;
`;
