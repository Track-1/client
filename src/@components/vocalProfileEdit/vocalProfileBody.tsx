import styled from "styled-components";

import VocalImageEdit from "../vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@common/profileTitleInput";
import CategoriesEdit from "../@common/selectCategories";
import HashtagsEdit from "../@common/hashtag/hashtagsEdit";
import VocalSleeper from "../vocalProfileEdit/vocalSleeper";
import { ProfileBackgroundIc } from "../../assets";
import { useState } from "react";
import DescriptionInput from "../@common/upload/common/DescriptionInput";

export default function VocalProfileEditPage() {
  // 더미 데이터로 초기 설정
  const [profileData, setProfileData] = useState({
    name: "한에옹",
    contact: "5ning@naver.com",
    categories: ["R&B", "Jazz"],
    hashtags: ["얏호", "오이"],
    description: "맛있는 오이",
  });

  // input값이 변경될 때 호출
  const handleInputChange = (value: string) => {
    setProfileData((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  return (
    <>
      <ProfileBackgroundIcon />
      <ProfileEditContainer>
        <ProfileEditTitle>
          <VocalImageEdit />
          <TitleInputEdit
            inputTitle="name"
            data={profileData.name}
            onChangeProps={(value) => handleInputChange(value)}
          />
          <VocalSleeper />
        </ProfileEditTitle>
        <ProfileEditInfo>
          <TitleInputEdit
            inputTitle="contact"
            data={profileData.name}
            onChangeProps={(value) => handleInputChange(value)}
          />
          <CategoriesEdit />
          <HashtagsEdit />
          <DescriptionInput />
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

export const ProfileEditContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const ProfileContainer = styled.section`
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

export const ProfileEditTitle = styled(ProfileContainer)``;

export const ProfileEditInfo = styled(ProfileContainer)`
  width: 77.9rem;
`;
