import styled from "styled-components";

import VocalImageEdit from "../@components/vocalProfileEdit/vocalImageEdit";
import TitleInputEdit from "../@components/@common/titleInputEdit";
import CategoriesEdit from "../@components/@common/categoriesEdit";
import HashtagsEdit from "../@components/@common/hashtagsEdit";

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

const ProfileEditContainer = styled.section`
  display: flex;
  justify-content: space-between;
  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const ProfileEditTitle = styled.section`
  height: 88.8rem;
  width: 67.7rem;

  backdrop-filter: blur(1rem);
  //background-color: rgba(20, 21, 23, 0.6);
  background-color: pink;
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileEditInfo = styled.div`
  float: right;
`;
