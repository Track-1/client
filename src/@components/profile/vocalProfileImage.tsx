import styled from "styled-components";

interface VocalProfileImageProps {
  profileImage: string | undefined;
}

export default function VocalProfileImage(props: VocalProfileImageProps) {
  const { profileImage } = props;

  return (
    <Container>
      <Image src={profileImage} alt="프로필이미지" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 19.3rem;
  width: 19.3rem;
  border-radius: 3rem;
  overflow: hidden;
  transform: rotate(-45deg);
  margin-bottom: 4rem;
`;

const Image = styled.img`
  width: 150%;
  height: 150%;

  object-fit: cover;
  margin: auto;

  transform: rotate(45deg);
  position: absolute;
`;
