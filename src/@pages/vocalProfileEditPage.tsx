import styled from "styled-components";

import VocalImageEdit from "../@components/vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@components/@common/profileTitleInput";
import CategoriesEdit from "../@components/@common/selectCategories";
import HashtagsEdit from "../@components/@common/hashtag/hashtagsEdit";
import { ProfileEditTitle, ProfileEditContainer } from "./producerProfileEditPage";

export default function VocalProfileEditPage() {
  return (
    <>
      <ProfileEditContainer>
        <ProfileEditTitle>
          <VocalImageEdit />
          <TitleInputEdit inputTitle="name" />
        </ProfileEditTitle>
        <ProfileEditInfo>
          <TitleInputEdit inputTitle="contact" />
          <CategoriesEdit />
          <HashtagsEdit />
          <TitleInputEdit inputTitle="description" />
        </ProfileEditInfo>
      </ProfileEditContainer>
    </>
  );
}

const ProfileEditInfo = styled.div`
  float: right;
`;
