import styled from "styled-components";

import VocalImageEdit from "../@components/vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@components/@common/profileTitleInput";
import CategoriesEdit from "../@components/@common/selectCategories";
import HashtagsEdit from "../@components/@common/hashtagsEdit";
import { ProfileEditTitle, ProfileEditContainer } from "./producerProfileEditPage";

export default function VocalProfileEditPage() {
  return (
    <>
      <ProfileEditContainer>
        <ProfileEditTitle>
          <VocalImageEdit />
          <TitleInputEdit />
        </ProfileEditTitle>
        <ProfileEditInfo>
          <TitleInputEdit />
          <CategoriesEdit />
          <HashtagsEdit />
          <TitleInputEdit />
        </ProfileEditInfo>
      </ProfileEditContainer>
    </>
  );
}


const ProfileEditInfo = styled.div`
  float: right;
`;
