import styled from "styled-components";

import ProducerImageEdit from "../@components/producerProfileEdit/producerImageEdit";
import TitleInputEdit from "../@components/@common/profileTitleInput";
import CategoriesEdit from "../@components/@common/selectCategories";
import HashtagsEdit from "../@components/@common/hashtagsEdit";
import { ProfileBackgroundIc } from "../assets";

export default function ProducerProfileEditPage() {
  return (
    <>
      <ProfileBackgroundIcon />
      <ProfileEditContainer>
        <ProfileEditTitle>
          <ProducerImageEdit />
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

export const ProfileEditTitle = styled.section`
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

const ProfileEditInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 77.9rem;
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
