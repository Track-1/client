import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ProfileBackgroundIc, UploadActiveSaveButtonIc, UploadUnActiveSaveButtonIc } from "../../../assets";
import { TEXT_LIMIT } from "../../../core/common/textLimit";
import useInputText from "../../../hooks/common/useInputText";
import useUploadImageFile from "../../../hooks/common/useUploadImageFile";
import { useEditProdcerProfile } from "../../../hooks/queries/profile";
import Header from "../../@common/header";
import ProducerImageEdit from "./producerImageEdit";
import ProfileContactEdit from "./producerContactEdit";
import ProfileDescriptionEdit from "../profileDescriptionEdit";
import ProfileHashtagEdit from "../profileHashtagEdit";
import ProducerSelectCategoryEdit from "./producerSelectCategoryEdit";
import { CategoryIdType } from "../../../type/common/category";
import ProducerNameEdit from "./producerNameEdit";
import BackButton from "../../@common/backButton";
import { useGetProducerProfile } from "../../../hooks/queries/mypage";
import { useParams } from "react-router-dom";
import { useCheck } from "../../../hooks/common/useCheck";

export default function ProducerProfileEditContainer() {
  const { id } = useParams();
  const { editProducerProfile } = useEditProdcerProfile();
  const prevUserInfo = useGetProducerProfile(Number(id)).producerProfile?.userProfile;

  const { imageFile, previewImage, handleUploadImageFile } = useUploadImageFile(prevUserInfo?.userImageFile);
  const { checkedOptions: selectedCategory, check: selectCategory } = useCheck<CategoryIdType>();
  const [description, handleChangeDescription] = useInputText("", TEXT_LIMIT.PROFILE_DESCRIPTION);

  const [imageFileSame, setImageFileSame] = useState(true);
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [isUploadActive, setIsUploadActive] = useState(true);

  const methods = useForm({
    defaultValues: {
      nickName: prevUserInfo?.userName ?? "",
      contact: prevUserInfo?.userContact ?? "",
    },
    mode: "onChange",
  });

  function getHashtags(hashtags: string[]) {
    setHashTags([...hashtags]);
  }

  useEffect(() => {
    imageFile !== null ? setImageFileSame(false) : setImageFileSame(true);
  }, [imageFile]);

  useEffect(() => {
    const required = methods.formState.isValid;
    required ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [methods.formState.isValid]);

  return (
    <form>
      <Header>
        <BackButton staticPrevURL={-1} />
        {isUploadActive ? (
          <button
            onClick={methods.handleSubmit(({ nickName, contact }) =>
              editProducerProfile({
                userImageFile: imageFile,
                userName: nickName,
                userContact: contact,
                userCategory: selectedCategory,
                userKeyword: hashTags,
                userIntroduction: description,
                userImageFileSame: imageFileSame,
              }),
            )}>
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
          <ProducerNameEdit methods={methods} />
        </ProfileEditTitle>

        <ProfileEditInfo>
          <ProfileEditInfoWrapper>
            <ProfileContactEdit methods={methods} />
            <ProducerSelectCategoryEdit selectCategory={selectCategory} />
            <ProfileHashtagEdit getHashtags={getHashtags} />
            <ProfileDescriptionEdit description={description} handleChangeDescription={handleChangeDescription} />
          </ProfileEditInfoWrapper>
        </ProfileEditInfo>
      </ProfileEditContainerBox>
    </form>
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
