import styled from "styled-components";

interface ProducerProfileImageProps {
  profileImage: string | undefined;
}

export default function ProducerProfileImage(props: ProducerProfileImageProps) {
  const { profileImage } = props;

  return (
    <Container>
      <ProfileImage src={profileImage} alt="프로필이미지" />
    </Container>
  );
}

const Container = styled.div`
  height: 26rem;
  width: 26rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  height: 100%;
  width: 100%;

  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;
