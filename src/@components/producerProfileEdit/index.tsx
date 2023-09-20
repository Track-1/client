import styled from "styled-components";
import ProducerImageEdit from "./producerImageEdit";
import ProfileNameEdit from "./profileNameEdit";
import ProfileHashtagEdit from "./profileHashtagEdit";
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

export default function ProducerProfileEditContainer() {
  const { imageFile, previewImage, handleUploadImageFile } = useUploadImageFile();
  const [description, handleChangeDescriptikon] = useInputText("", TEXT_LIMIT.DESCRIPTION);
  const { categories, isCategorySelected, handleSelectCategory } = useSelectCategory();
  const [isUploadActive, setIsUploadActive] = useState(false);
  const [name, handleChangeName] = useInputText("", TEXT_LIMIT.NICK_NAME);
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();

  const methods = useForm({
    defaultValues: {
      nickName: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    const nickName = methods.getValues().nickName;
    return nickName !== "" ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [methods.getValues()]);

  return (
    <>
      <Header backBtn>{isUploadActive ? <UploadActiveSaveButtonIcon /> : <UploadUnActiveSaveButtonIcon />}</Header>
      <ProfileBackgroundIcon />
      <ProfileEditContainer>
        <ProfileEditTitle>
          <ProducerImageEdit
            imageFile={imageFile}
            previewImage={previewImage}
            handleUploadImageFile={handleUploadImageFile}
          />
          <ProfileNameEdit methods={methods} />
        </ProfileEditTitle>

        <ProfileEditInfo>
          <ProfileEditInfoWrapper>
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

const ProfileBackgroundIcon = styled(ProfileBackgroundIc)`
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

const ProfileEditInfoWrapper = styled.div`
  margin-top: 8.9rem;
`;

export const ProfileEditTitle = styled(ProfileContainer)``;

export const ProfileEditInfo = styled(ProfileContainer)`
  width: 77.9rem;
`;

const UploadActiveSaveButtonIcon = styled(UploadActiveSaveButtonIc)`
  width: 24.6rem;
`;

const UploadUnActiveSaveButtonIcon = styled(UploadUnActiveSaveButtonIc)`
  width: 24.6rem;
`;
