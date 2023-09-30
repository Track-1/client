import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetProducerProfile } from "../../hooks/queries/mypage";

export default function ProducerProfileImage() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  return (
    <Container>
      <ProfileImage src={producerProfile?.userProfile.userImageFile} alt="프로필이미지" />
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
