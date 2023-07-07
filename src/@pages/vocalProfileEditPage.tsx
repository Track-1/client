import styled from "styled-components";

import VocalImageEdit from "../@components/vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@components/@common/profileTitleInput";
import CategoriesEdit from "../@components/@common/selectCategories";
import HashtagsEdit from "../@components/@common/hashtag/hashtagsEdit";
import { ProfileEditTitle, ProfileEditContainer } from "./producerProfileEditPage";
import { useState } from "react";

export default function VocalProfileEditPage() {
  // 더미 데이터로 초기 설정
  const [profileData, setProfileData] = useState({
    name: "한에옹",
    contact: "5ning@naver.com",
    categories: ["R&B", "Jazz"],
    hashtags: ["얏호", "오이"],
    description: "맛있는 오이",
  });

  // 입력 필드 값이 변경될 때 호출되는 핸들러
  const handleInputChange = (inputTitle: string, value: any) => {
    setProfileData((prevState) => ({
      ...prevState,
      [inputTitle]: value,
    }));
  };

  return (
    <>
      <ProfileEditContainer>
        <ProfileEditTitle>
          <VocalImageEdit />
          <TitleInputEdit
            inputTitle="name"
            data={profileData.name}
            onChangeProps={(value: any) => handleInputChange("name", value)}
          />
        </ProfileEditTitle>
        <ProfileEditInfo>
          <TitleInputEdit
            inputTitle="contact"
            data={profileData.name}
            onChangeProps={(value: any) => handleInputChange("name", value)}
          />
          <CategoriesEdit />
          <HashtagsEdit />
          <TitleInputEdit
            inputTitle="description"
            data={profileData.name}
            onChangeProps={(value: any) => handleInputChange("name", value)}
          />
        </ProfileEditInfo>
      </ProfileEditContainer>
    </>
  );
}

const ProfileEditInfo = styled.div`
  float: right;
`;
