import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileEditBtnIc } from "../../assets";
import useGetVocalProfile from "../../hooks/vocalProfile/useGetVocalProfile";
import BackButton from "../@common/backButton";
import Portfolio from "../portfolio";
import Profile from "../profile";

export default function VocalProfile() {
  const { vocalId } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(vocalId));
  const navigate = useNavigate();

  function handleMoveProfileEditPage() {
    navigate(`/profile-edit/vocal/${vocalProfile?.userProfile.userId}`);
  }

  return (
    <Container>
      <LeftSection>
        <BackButtonWrapper>
          <BackButton />
          {vocalProfile?.userSelf && <ProfileEditBtnIcon onClick={handleMoveProfileEditPage} />}
        </BackButtonWrapper>
        <Profile userType="vocal" userSelf={vocalProfile?.userSelf} userProfile={vocalProfile?.userProfile} />
      </LeftSection>
      <Right>
        <Portfolio />
      </Right>
    </Container>
  );
}

const Right = styled.section`
  border: 1px solid white;
  width: 186rem;
`;
const Container = styled.div`
  display: flex;
`;

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

const LeftSection = styled.section`
  width: 60rem;
`;
