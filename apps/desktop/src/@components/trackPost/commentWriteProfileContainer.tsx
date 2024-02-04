import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { loginUserImage } from '../../recoil/common/loginUserData';

export default function CommentWriteProfileContainer() {
  const userImage = useRecoilValue(loginUserImage);

  return (
    <ImageContainer>
      <ProfileImageWrapper>
        <ProfileImage src={userImage} alt="프로필 이미지" />
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
