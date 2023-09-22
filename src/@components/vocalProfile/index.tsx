import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileEditBtnIc } from "../../assets";
import useGetVocalProfile from "../../hooks/vocalProfile/useGetVocalProfile";
import BackButton from "../@common/backButton";
import Profile from "../profile";

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  const navigate = useNavigate();

  function handleMoveProfileEditPage() {
    navigate(`/profile-edit/vocal/${vocalProfile?.userProfile.userId}`);
  }

  return (
    <>
      <BackButtonWrapper>
        <BackButton />
        {vocalProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
      </BackButtonWrapper>
      <Profile userType="vocal" userProfile={vocalProfile?.userProfile} />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 6rem 0 6rem 0;
  display: flex;
  padding: 0 8rem;
  width: 100%;
  justify-content: space-between;
`;

const ProfileEditBtnIcon = styled(ProfileEditBtnIc)`
  width: 16.6rem;
  margin-left: 16.9rem;

  cursor: pointer;
`;
