import { useParams } from "react-router-dom";
import styled from "styled-components";
import useGetProducerProfile from "../../hooks/producerProfile/useGetProducerProfile";
import BackButton from "../@common/backButton";
import Profile from "../profile";

export default function ProducerProfile() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <Profile userType="producer" userSelf={producerProfile?.userSelf} userProfile={producerProfile?.userProfile} />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 6rem 0 2rem 8rem;
`;
