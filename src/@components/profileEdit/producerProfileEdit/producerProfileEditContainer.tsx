import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import styled from "styled-components";
import { ProfileBackgroundIc, UploadActiveSaveButtonIc, UploadUnActiveSaveButtonIc } from "../../../assets";
import useUploadImageFile from "../../../hooks/common/useUploadImageFile";
import { useEditProdcerProfile } from "../../../hooks/queries/profile";
import Header from "../../@common/header";
import ProducerImageEdit from "./producerImageEdit";
import ProfileDescriptionEdit from "../profileDescriptionEdit";
import ProfileHashtagEdit from "../profileHashtagEdit";
import { CategoryIdType, UpperCategoryType } from "../../../type/common/category";
import BackButton from "../../@common/backButton";
import { useGetProducerProfile } from "../../../hooks/queries/mypage";
import { useParams } from "react-router-dom";
import ProfileNickname from "../../@common/profileNickname";
import ProfileContact from "../../@common/profileContact";
import { CategoryId } from "../../../core/common/categories";
import { convertKeyToValue } from "../../../utils/common/convertKeyToValue";
import ProfileSelectCategoryEdit from "../profileSelectCategoryEdit";

export default function ProducerProfileEditContainer() {
  const { id } = useParams();
  const { editProducerProfile } = useEditProdcerProfile();
  const prevUserInfo = useGetProducerProfile(Number(id)).producerProfile?.userProfile;
  const { imageFile, previewImage, handleUploadImageFile } = useUploadImageFile(prevUserInfo?.userImageFile);
  const [imageFileSame, setImageFileSame] = useState(true);

  const methods = useForm({
    defaultValues: {
      nickName: prevUserInfo?.userName ?? "",
      contact: prevUserInfo?.userContact ?? "",
      category: prevUserInfo?.userCategory
        ? convertKeyToValue<UpperCategoryType, CategoryIdType>(prevUserInfo?.userCategory, CategoryId)
        : [],
      hashtag: prevUserInfo?.userKeyword ?? [],
      description: prevUserInfo?.userIntroduction ?? "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    imageFile !== null ? setImageFileSame(false) : setImageFileSame(true);
  }, [imageFile]);

  return (
    <FormProvider {...methods}>
      <form>
        <Header>
          <BackButton staticPrevURL={-1} />
          {methods.formState.isValid ? (
            <button
              onClick={methods.handleSubmit(({ nickName, contact, category, hashtag, description }) =>
                editProducerProfile({
                  userImageFile: imageFile,
                  userName: nickName,
                  userContact: contact,
                  userCategory: category,
                  userKeyword: hashtag.filter((item) => item.length > 0),
                  userIntroduction: description,
                  userImageFileSame: imageFileSame,
                }),
              )}
              type="button">
              <UploadActiveSaveButtonIcon />
            </button>
          ) : (
            <UploadUnActiveSaveButtonIcon />
          )}
        </Header>
        <ProfileBackgroundIcon />
        <ProfileEditContainerBox>
          <ProfileEditTitle>
            <ProducerImageEdit previewImage={previewImage} handleUploadImageFile={handleUploadImageFile} />
            <ProfileNickname />
          </ProfileEditTitle>

          <ProfileEditInfo>
            <ProfileEditInfoWrapper>
              <ProfileContact />
              <ProfileSelectCategoryEdit />
              <ProfileHashtagEdit />
              <ProfileDescriptionEdit />
            </ProfileEditInfoWrapper>
          </ProfileEditInfo>
        </ProfileEditContainerBox>
      </form>
    </FormProvider>
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
