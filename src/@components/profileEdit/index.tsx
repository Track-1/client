import styled from "styled-components";
import ProfileHashtagEdit from "./profileHashtagEdit";
import ProfileNameEdit from "./profileNameEdit";
import { ProfileBackgroundIc, UploadActiveSaveButtonIc, UploadUnActiveSaveButtonIc } from "../../assets";
import useInputText from "../../hooks/common/useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useUploadImageFile from "../../hooks/common/useUploadImageFile";
import ProfileSelectCategoryEdit from "./profileSelectCategoryEdit";
import { useForm } from "react-hook-form";
import useSelectCategory from "../../hooks/producerProfileEdit/useSelectCategories";
import ProfileDescriptionEdit from "./profileDescriptionEdit";
import Header from "../@common/header";
import { useEffect, useState } from "react";
import useHashtagInput from "../../hooks/common/useHashtagInput";
import { ROLE } from "../../core/common/roleType";
import VocalImageEdit from "./vocalProfileEdit/vocalImageEdit";
import VocalSleeper from "./vocalProfileEdit/vocalSleeper";
import ProfileContactEdit from "./profileContactEdit";
import ProducerImageEdit from "./producerProfileEdit/producerImageEdit";

export default function ProducerProfileEditContainer() {
  const { imageFile, previewImage, handleUploadImageFile } = useUploadImageFile();
  const [description, handleChangeDescriptikon] = useInputText("", TEXT_LIMIT.DESCRIPTION);
  const { categories, isCategorySelected, handleSelectCategory } = useSelectCategory();
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [name, handleChangeName] = useInputText("", TEXT_LIMIT.NICK_NAME);
  const [contact, handleChangeContact] = useInputText("");

  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();
  const [isSleep, setIsSleep] = useState(false);

  const nameMethods = useForm({
    defaultValues: {
      nickName: "",
    },
    mode: "onChange",
  });

  const contactMethods = useForm({
    defaultValues: {
      contact: "",
    },
    mode: "onChange",
  });

  const userType = "vocal";

  useEffect(() => {
    const nickName = nameMethods.getValues().nickName;
    return nickName !== "" ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [nameMethods.watch()]);

  function handleChangeIsSleep() {
    setIsSleep((prev) => !prev);
  }

  return (
    <>
      <Header backBtn>{isUploadActive ? <UploadActiveSaveButtonIcon /> : <UploadUnActiveSaveButtonIcon />}</Header>
      <ProfileBackgroundIcon />
      <ProfileEditContainer>
        <ProfileEditTitle>
          {userType === ROLE.PRODUCER ? (
            <>
              <ProducerImageEdit
                imageFile={imageFile}
                previewImage={previewImage}
                handleUploadImageFile={handleUploadImageFile}
              />
              <ProfileNameEdit methods={nameMethods} />
            </>
          ) : (
            <>
              <VocalImageEdit
                imageFile={imageFile}
                previewImage={previewImage}
                handleUploadImageFile={handleUploadImageFile}
              />
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
              handleEnterHashtag={handleEnterHashtag}
              handleAddHashtag={handleAddHashtag}
              handleRemoveHashtag={handleRemoveHashtag}
              handleChangeHashtagInputText={handleChangeHashtagInputText}
            />
            <ProfileDescriptionEdit description={description} handleChangeDescription={handleChangeDescriptikon} />
          </ProfileEditInfoWrapper>
        </ProfileEditInfo>
      </ProfileEditContainer>
    </>
  );
}

export const ProfileBackgroundIcon = styled(ProfileBackgroundIc)`
  position: absolute;

  width: 192rem;
  height: 98rem;
`;

export const ProfileEditContainer = styled.div`
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
`;

export const UploadUnActiveSaveButtonIcon = styled(UploadUnActiveSaveButtonIc)`
  width: 24.6rem;
`;
