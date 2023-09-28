import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileEditBtnIc } from "../../assets";
import useGetProducerProfile from "../../hooks/producerProfile/useGetProducerProfile";
import BackButton from "../@common/backButton";
import Profile from "../profile";

export default function ProducerProfile() {
  const { producerId } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(producerId));
  const navigate = useNavigate();

  function handleMoveProfileEditPage() {
    navigate(`/profile-edit/producer/${producerProfile?.userProfile.userId}`);
  }

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
        {producerProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
      </BackButtonWrapper>
      <Profile userType="producer" userSelf={producerProfile?.userSelf} userProfile={producerProfile?.userProfile} />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 6rem 0 6rem 0;
  display: flex;
  padding: 0 8rem;
  width: 60rem;
  justify-content: space-between;
`;

const ProfileEditBtnIcon = styled(ProfileEditBtnIc)`
  width: 16.6rem;
  margin-left: 16.9rem;

  cursor: pointer;
`;