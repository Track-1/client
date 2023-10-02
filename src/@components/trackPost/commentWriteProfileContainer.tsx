import styled from "styled-components";
import { ROLE } from "../../core/common/roleType";
import { useGetProducerProfile, useGetVocalProfile } from "../../hooks/queries/mypage";

export default function CommentWriteProfileContainer() {
  // userType, userId
  const userType = "producer";
  const userId = 7;
  const { vocalProfile } = useGetVocalProfile(userId);
  const { producerProfile } = useGetProducerProfile(userId);
  const defaultImage = "https://track1-default.s3.ap-northeast-2.amazonaws.com/default_user2.png";

  return (
    <ImageContainer>
      <ProfileImageWrapper>
        <ProfileImage
          src={
            userType === ROLE.PRODUCER
              ? producerProfile?.userProfile.userImageFile
              : userType === ROLE.VOCAL
              ? vocalProfile?.userProfile.userImageFile
              : defaultImage
          }
          alt="프로필 이미지"
        />
      </ProfileImageWrapper>
    </ImageContainer>
  );
}

const ProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 9rem;
  height: 9rem;
  border-radius: 9rem;
  position: absolute;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  margin-top: -9rem;
  margin-left: 3rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;
